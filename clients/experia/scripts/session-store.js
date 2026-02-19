/**
 * @module session-store
 * @version 1.0.0
 * @purpose Conversation state management for WhatsApp sessions.
 *          Key = phone number, TTL = 24h, auto-cleanup via interval.
 * @inputs  { phoneNumber, message, intent, metadata }
 * @outputs { session object with history + state }
 * @emits   session:created, session:updated, session:expired
 * @dependencies event-bus.js
 */

const fs = require('fs');
const path = require('path');
const { bus: eventBus } = require('./event-bus');

const SESSION_TTL = parseInt(process.env.SESSION_TTL) || 24 * 60 * 60 * 1000; // 24h
const SESSIONS_DIR = path.join(__dirname, '..', '.aios-core', 'data', 'sessions');

// Ensure storage directory exists
if (!fs.existsSync(SESSIONS_DIR)) {
    fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

class SessionStore {
    constructor() {
        this.cache = new Map();
        this.startCleanupInterval();
    }

    /**
     * Create or update a session for a given phone number
     * @param {string} phoneNumber 
     * @param {string} [message] - Optional message to append to history
     * @param {string} [intent] - Optional intent to update
     * @param {object} [metadata] - Optional metadata to merge
     * @returns {object} The updated session object
     */
    createOrUpdate(phoneNumber, message = null, intent = null, metadata = {}) {
        let session = this.get(phoneNumber);
        const now = new Date();

        if (!session) {
            session = {
                phone: phoneNumber,
                created: now.toISOString(),
                lastActivity: now.toISOString(),
                ttl: SESSION_TTL,
                state: 'active',
                intents: [],
                messages: [],
                metadata: {}
            };
            eventBus.emit('session:created', { phone: phoneNumber });
        }

        // Update timestamps
        session.lastActivity = now.toISOString();

        // Update metadata
        if (metadata) {
            session.metadata = { ...session.metadata, ...metadata };
        }

        // Add message to history
        if (message) {
            session.messages.push({
                role: 'user', // Default assumption, can be explicit in metadata
                text: message,
                timestamp: now.toISOString()
            });
        }

        // Add intent to history
        if (intent) {
            session.intents.push({
                intent: intent.name,
                confidence: intent.confidence,
                timestamp: now.toISOString()
            });
        }

        // Persist
        this.save(phoneNumber, session);
        eventBus.emit('session:updated', { phone: phoneNumber, state: session.state });

        return session;
    }

    /**
     * Get a session by phone number, checking memory cache first then disk
     * @param {string} phoneNumber 
     * @returns {object|null} Session object or null if not found/expired
     */
    get(phoneNumber) {
        // 1. Check Memory Cache
        if (this.cache.has(phoneNumber)) {
            const session = this.cache.get(phoneNumber);
            if (this.isExpired(session)) {
                this.expire(phoneNumber);
                return null;
            }
            return session;
        }

        // 2. Check Disk
        const filePath = path.join(SESSIONS_DIR, `${phoneNumber}.json`);
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                const session = JSON.parse(data);

                if (this.isExpired(session)) {
                    this.expire(phoneNumber);
                    return null;
                }

                // Hydrate cache
                this.cache.set(phoneNumber, session);
                return session;
            } catch (err) {
                console.error(`Error reading session ${phoneNumber}:`, err);
                return null;
            }
        }

        return null;
    }

    /**
     * Save session to memory and disk
     * @param {string} phoneNumber 
     * @param {object} session 
     */
    save(phoneNumber, session) {
        this.cache.set(phoneNumber, session);

        const filePath = path.join(SESSIONS_DIR, `${phoneNumber}.json`);
        try {
            // Atomic write pattern: write only if valid
            fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
        } catch (err) {
            console.error(`Error saving session ${phoneNumber}:`, err);
        }
    }

    /**
     * Delete/Expire a session
     * @param {string} phoneNumber 
     */
    expire(phoneNumber) {
        this.cache.delete(phoneNumber);

        const filePath = path.join(SESSIONS_DIR, `${phoneNumber}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        eventBus.emit('session:expired', { phone: phoneNumber });
    }

    /**
     * Check if a session is expired based on TTL
     * @param {object} session 
     * @returns {boolean}
     */
    isExpired(session) {
        const lastActivity = new Date(session.lastActivity).getTime();
        const now = new Date().getTime();
        return (now - lastActivity) > SESSION_TTL;
    }

    /**
     * Start background cleanup interval
     */
    startCleanupInterval() {
        // Run every 10 minutes
        setInterval(() => {
            this.cleanup();
        }, 10 * 60 * 1000);
    }

    /**
     * Iterate through sessions and expire old ones
     * @returns {object} Stats of cleaned sessions
     */
    cleanup() {
        let expiredCount = 0;

        // Check memory cache first
        for (const [phone, session] of this.cache.entries()) {
            if (this.isExpired(session)) {
                this.expire(phone);
                expiredCount++;
            }
        }

        // Scan disk (for sessions not in memory)
        try {
            const files = fs.readdirSync(SESSIONS_DIR);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const phone = file.replace('.json', '');
                    if (!this.cache.has(phone)) { // Already checked if in cache
                        const filePath = path.join(SESSIONS_DIR, file);
                        const data = fs.readFileSync(filePath, 'utf8');
                        const session = JSON.parse(data);
                        if (this.isExpired(session)) {
                            this.expire(phone);
                            expiredCount++;
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error during session cleanup:', err);
        }

        if (expiredCount > 0) {
            console.log(`[SessionStore] Cleaned up ${expiredCount} expired sessions.`);
        }
        return { expired: expiredCount };
    }
}

// Singleton instance
const sessionStore = new SessionStore();

// CLI Testing Support
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'test') {
        console.log('Testing SessionStore...');
        const testPhone = '5511999999999';

        console.log('1. Creating session...');
        sessionStore.createOrUpdate(testPhone, 'Olá', { name: 'greeting' });

        console.log('2. Reading session...');
        const s = sessionStore.get(testPhone);
        console.log('Session state:', s ? 'FOUND' : 'NOT FOUND', s?.messages[0]?.text);

        console.log('3. Expiring session...');
        sessionStore.expire(testPhone);

        console.log('4. Verifying expiration...');
        const s2 = sessionStore.get(testPhone);
        console.log('Session state:', s2 ? 'FOUND' : 'CLEARED');

        console.log('Test complete.');
    }
}

module.exports = sessionStore;
