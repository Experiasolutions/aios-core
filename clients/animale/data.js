// data.js
// Dados fictícios simulando o sistema da Hovet Animale para o MVP

const dadosHoje = {
    data: "26/02/2026",
    faturamento: {
        total: "R$ 4.280",
        atendimentos: 14,
        cirurgias: "3 (2 castração, 1 desobstrução)"
    },
    agenda: [
        { hora: "08:30", paciente: "Thor (Golden)", motivo: "Retorno pós-op" },
        { hora: "09:00", paciente: "Mia (Siamês)", motivo: "Vacinação V4" },
        { hora: "10:30", paciente: "Bob (Vira-lata)", motivo: "Consulta geral" },
        { hora: "14:00", paciente: "Luna (Poodle)", motivo: "Banho terapêutico" },
        { hora: "16:00", paciente: "VAGA DISPONÍVEL", motivo: "← oferecer para lista de espera?" }
    ],
    internacoes: [
        { paciente: "Tigrinho", motivo: "Desobstrução uretral", dia: "2/2", status: "Estável. Sonda posicionada, urinando normalmente. Próxima avaliação: 27/02 às 10h. Tutor notificado às 18h de ontem." },
        { paciente: "Rex", motivo: "Pós-op castração", dia: "3/3", status: "Alta prevista para hoje às 14h." }
    ],
    alertas: [
        "⚠️ 3 tutores não confirmaram consulta de amanhã.",
        "⚠️ Felícia (gata, DM) — retorno atrasado há 12 dias.",
        "⚠️ Estoque: ração Hills c/d baixo (2 unidades)."
    ],
    leads: [
        "Marcos (tutor da Mel) perguntou sobre castração no WhatsApp e não respondeu o orçamento.",
        "Julia (tutora do Pipoca) não reagendou a vacina atrasada."
    ]
};

module.exports = { dadosHoje };
