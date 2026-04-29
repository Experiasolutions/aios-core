/**
 * Catálogo Visual de Tecidos — Ateliê Paulo Tapeceiro.
 * Busca tecidos por palavra-chave e retorna lista de itens para envio via Evolution API.
 */
const catalog = require('../config/catalog.json');

/**
 * Busca tecidos que correspondam à keyword informada.
 * Busca em: nome, categoria, cor e tags.
 * @param {string|null} keyword - Palavra de busca (null = retorna todos disponíveis)
 * @returns {Array} Lista de tecidos encontrados
 */
function searchFabrics(keyword) {
    const available = catalog.tecidos.filter(t => t.available);

    if (!keyword || keyword.length < 2) {
        // Sem keyword: retorna primeiros 4 (para não sobrecarregar o WA)
        return available.slice(0, 4);
    }

    const kw = keyword.toLowerCase().trim();
    const results = available.filter(t =>
        t.nome.toLowerCase().includes(kw) ||
        t.categoria.toLowerCase().includes(kw) ||
        t.cor.toLowerCase().includes(kw) ||
        t.tags.some(tag => tag.includes(kw))
    );

    // Limite de 6 resultados por envio (não spam)
    return results.slice(0, 6);
}

/**
 * Formata a legenda de um tecido para envio via WhatsApp.
 */
function formatFabricCaption(fabric) {
    return `🪡 *${fabric.nome}*\n` +
        `Ref: ${fabric.ref}\n` +
        `${fabric.descricao}\n\n` +
        `_Quer usar este tecido? Me conta a peça que você quer reformar!_`;
}

/**
 * Retorna mensagem de introdução antes de enviar o catálogo.
 */
function getCatalogIntroMessage(keyword, count) {
    if (count === 0) {
        return `Não encontrei tecidos com "${keyword}" no catálogo agora. Mas posso te mostrar outras opções! Quer ver o catálogo completo?`;
    }
    const intro = keyword
        ? `Encontrei ${count} opção${count > 1 ? 'ões' : ''} de "${keyword}" no nosso catálogo:`
        : `Aqui estão algumas das nossas opções de tecido:`;
    return `🎨 ${intro}`;
}

module.exports = { searchFabrics, formatFabricCaption, getCatalogIntroMessage };
