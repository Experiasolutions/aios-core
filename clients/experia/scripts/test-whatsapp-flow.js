/**
 * WhatsApp Flow Simulation Test
 * Simulates the full pipeline: Input -> Session -> Classifier -> Response
 */

const sessionStore = require('./session-store');
const intentClassifier = require('./intent-classifier');
const responseBuilder = require('./response-builder');

// Mock helpers
const PHONE = "5511999999999";
const METADATA = { pushName: "Tester" };

async function simulateMessage(text) {
    console.log(`\nUNKNOWN_USER (${PHONE}): "${text}"`);

    // 1. Session
    console.log(`[...] Updating session...`);
    const session = sessionStore.createOrUpdate(PHONE, text, null, METADATA);

    // 2. Classify
    console.log(`[...] Classifying intent...`);
    const classification = intentClassifier.classify(text, session);
    console.log(`      Intent: ${classification.intent} (${classification.confidence})`);

    // Update session with intent
    sessionStore.createOrUpdate(PHONE, null, classification);

    // 3. Response
    console.log(`[...] Building response...`);
    const response = responseBuilder.build(classification.intent, classification.entities, session);

    console.log(`BOT: "${response.text.replace(/\n/g, '\n      ')}"`);
    return response;
}

async function runTest() {
    console.log("🚀 Starting End-to-End Simulation (Local)");

    // Clear previous session
    sessionStore.expire(PHONE);

    // Flow 1: Greeting
    await simulateMessage("Oi, tudo bem?");

    // Flow 2: Scheduling
    await simulateMessage("Gostaria de marcar uma consulta");

    // Flow 3: Price (with context from scheduling?)
    await simulateMessage("Quanto custa?");

    // Flow 4: Complaint
    await simulateMessage("O atendimento demorou muito");

    console.log("\n✅ Simulation Complete");
}

runTest();
