const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('📦 KAIROS MCP Config Installer');
console.log('---------------------------------');

const configDir = path.join(os.homedir(), '.gemini', 'antigravity');
const configPath = path.join(configDir, 'mcp_config.json');

// Ensure directory exists
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

// Read existing config or create new
let config = { mcpServers: {} };
if (fs.existsSync(configPath)) {
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log(`✅ Arquivo mcp_config.json encontrado em ${configPath}`);
    } catch (e) {
        console.warn(`⚠️ Aviso: Não foi possível parsear o arquivo antigo. Um novo será criado.`);
    }
} else {
    console.log(`🆕 Criando novo mcp_config.json em ${configPath}`);
}

if (!config.mcpServers) config.mcpServers = {};

// The absolute path of mcp-server.js relative to this install script
const targetScriptPath = path.resolve(__dirname, 'mcp-server.js');

if (!fs.existsSync(targetScriptPath)) {
    console.error(`❌ ERRO CRÍTICO: Não foi possível encontrar mcp-server.js em ${targetScriptPath}`);
    process.exit(1);
}

// Preserve existing servers, but inject/overwrite aiox-kairos and essentials
config.mcpServers["aiox-kairos"] = {
    "command": "node",
    "args": [targetScriptPath],
    "env": {}
};

config.mcpServers["context7"] = config.mcpServers["context7"] || {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp@latest"],
    "env": {}
};

config.mcpServers["sequential-thinking"] = config.mcpServers["sequential-thinking"] || {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
    "env": {}
};

config.mcpServers["github"] = config.mcpServers["github"] || {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "INSIRA_SEU_TOKEN_AQUI"
    }
};

config.mcpServers["huggingface"] = config.mcpServers["huggingface"] || {
    "command": "npx",
    "args": ["-y", "mcp-remote", "https://huggingface.co/mcp"],
    "env": {}
};

config.mcpServers["brave-search"] = config.mcpServers["brave-search"] || {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
    "env": {
        "BRAVE_API_KEY": "INSIRA_SEU_TOKEN_AQUI"
    }
};

// Writes config back to disk
fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

console.log(`\n🎯 SUCESSO!`);
console.log(`A instância KAIROS (mcp-server.js) foi vinculada apontando para o path absoluto desta máquina:`);
console.log(`> ${targetScriptPath}`);
console.log(`\nIsto garante que a HUD do Antigravity (seja no Notebook ou no Desktop) leia o arquivo core corretamente.`);
console.log(`Lembre-se de reiniciar o Chat/Antigravity para as alterações entrarem em vigor!`);
