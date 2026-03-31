/**
 * SKYROS: TRIAGE MATINAL (Hemisfério Direito - Notebook)
 * Objetivo: Escanear roadmap e alertar a exclusividade P0 para o operador.
 */

const fs = require('fs');
const path = require('path');

const roadmapPath = path.join(__dirname, '..', '..', 'roadmap.md');
const anamnesisPath = path.join(__dirname, '..', '..', 'docs', 'anamnesis');

function runTriage() {
    console.log("=======================================");
    console.log("🌞 SKYROS V1.0: MORNING TRIAGE STARTED");
    console.log("=======================================\n");

    if (!fs.existsSync(roadmapPath)) {
        console.error("[ERRO] roadmap.md não encontrado no diretório raiz do KAIROS!");
        return;
    }

    const roadmapContent = fs.readFileSync(roadmapPath, 'utf8');
    
    // Buscar tarefas P0. Expressão que procura linhas contendo "| ... | P0"
    const p0TasksMatches = [...roadmapContent.matchAll(/\|.*[pP]0.*\|/g)];

    console.log("[1] SPRINT DE HOJE (Foco Extremo):");
    if (p0TasksMatches.length > 0) {
        p0TasksMatches.slice(0, 2).forEach((match, index) => {
            console.log(`  🔥 ALVO ${index + 1}: ${match[0].trim()}`);
        });
        if (p0TasksMatches.length > 2) {
            console.log(`  > (+${p0TasksMatches.length - 2} tarefas P0 identificadas, mas ignore. Foco nas duas acima).`);
        }
    } else {
        console.log("  Nenhuma tarefa classificada como P0. Tempo livre para P1/Deep Learning.");
    }

    console.log("\n[2] DIRETRIZ ANAMNESIS (Brain Dump):");
    console.log("  Sua memória biológica não é um HD. Esvazie preocupações antes de codar.");
    if (fs.existsSync(anamnesisPath)) {
        console.log("  ✅ Vault do Obsidian rastreado (/docs/anamnesis).");
        console.log("  INSTRUÇÃO: Abra o aplicativo do Obsidian no celular/notebook agora e despeje o caos da noite na Infinite Canvas.");
    } else {
        console.log("  ⚠️ CONFIGURAÇÃO PENDENTE: Crie a pasta docs/anamnesis e apunte o seu Obsidian para ela.");
    }

    console.log("\n=======================================");
    console.log("  Status Mental Sincronizado. Bom Código. ");
    console.log("=======================================");
}

runTriage();
