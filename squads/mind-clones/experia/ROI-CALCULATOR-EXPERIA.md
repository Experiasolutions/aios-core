# 📈 ROI-CALCULATOR-EXPERIA — Projeção de ROI Personalizada

> "Não vendemos serviço. Vendemos o custo de NÃO agir."
> Números matam objeções. ROI mata "tá caro".

---

## DNA Mental
Warren Buffett (valor intrínseco) + Daniel Kahneman (aversão à perda) + Alex Hormozi (value equation)

---

## Função
Gerar projeções de ROI personalizadas para cada lead da Experia.
Transforma 3 perguntas simples em um documento de 1 página que mata a objeção de preço.

---

## As 3 Perguntas de Intake

Gabriel faz na visita ou por WhatsApp:

1. **"Quantas mensagens recebe por dia no WhatsApp?"** → volume operacional
2. **"Qual o valor médio de uma venda/serviço?"** → ticket médio
3. **"Quantos clientes estima perder por falta de resposta?"** → perdas mensais

---

## Fórmula de Cálculo

```javascript
// Inputs
const mensagens_dia = INPUT_1;
const ticket_medio = INPUT_2;
const perdas_mes = INPUT_3;

// Diagnóstico
const horas_whatsapp_dia = mensagens_dia * 2 / 60; // ~2 min por mensagem
const horas_whatsapp_mes = horas_whatsapp_dia * 30;
const receita_perdida_mes = perdas_mes * ticket_medio;

// Com Experia
const taxa_recuperacao = 0.80; // 80% dos leads perdidos
const leads_recuperados = Math.round(perdas_mes * taxa_recuperacao);
const receita_recuperada = leads_recuperados * ticket_medio;
const investimento_experia = 497; // Pacote micro local
const lucro_liquido = receita_recuperada - investimento_experia;
const roi_percentual = Math.round((lucro_liquido / investimento_experia) * 100);

// Projeção 3 meses (com efeito composto de melhoria)
const mes_1 = receita_recuperada;
const mes_2 = mes_1 * 1.15; // +15% por refinamento do sistema
const mes_3 = mes_2 * 1.10; // +10% adicional
const total_3_meses = mes_1 + mes_2 + mes_3;
```

---

## Template de Output — PDF 1 Página

```
╔══════════════════════════════════════════════════════╗
║  📊 PROJEÇÃO DE ROI — [NOME_NEGOCIO]                ║
║  Gerado por: KAIROS Engine | Data: [DATA]           ║
╚══════════════════════════════════════════════════════╝

─── DIAGNÓSTICO ATUAL ───────────────────────────────

• Mensagens por dia no WhatsApp: [MENSAGENS_DIA]
• Tempo gasto respondendo: ~[HORAS_DIA]h/dia ([HORAS_MES]h/mês)
• Leads perdidos por demora: [PERDAS_MES]/mês
• Valor médio por cliente: R$[TICKET_MEDIO]
• 💰 Receita PERDIDA estimada: R$[RECEITA_PERDIDA]/mês

─── COM O SISTEMA EXPERIA ───────────────────────────

• Tempo recuperado: [HORAS_DIA]h/dia → [HORAS_MES]h/mês livres
• Leads capturados: [LEADS_RECUPERADOS] dos [PERDAS_MES] perdidos (80%)
• Receita recuperada: R$[RECEITA_RECUPERADA]/mês
• Investimento Experia: R$497/mês
• 🟢 Lucro líquido: R$[LUCRO_LIQUIDO]/mês
• 📈 ROI mês 1: +[ROI_PERCENTUAL]%

─── PROJEÇÃO 3 MESES ────────────────────────────────

│ Mês │ Receita Recuperada │ Investimento │ Lucro Líquido │
│  1  │ R$[MES_1]          │ R$497        │ R$[LUCRO_1]   │
│  2  │ R$[MES_2]          │ R$497        │ R$[LUCRO_2]   │
│  3  │ R$[MES_3]          │ R$497        │ R$[LUCRO_3]   │
│ TOT │ R$[TOTAL_3]        │ R$1.491      │ R$[LUCRO_TOT] │

─── EXEMPLO REAL ────────────────────────────────────

Se [NOME_NEGOCIO] perde só [PERDAS_MES] clientes/mês
por falta de resposta e cada cliente vale R$[TICKET]:
→ R$[RECEITA_PERDIDA]/mês perdido
→ Sistema custa R$497/mês
→ Lucro líquido: R$[LUCRO_LIQUIDO]/mês só de recuperação
→ ROI: +[ROI_PERCENTUAL]% no primeiro mês

──────────────────────────────────────────────────────
  "O custo do sistema é invisível.
   O custo de NÃO ter é o que você já paga todo mês."
──────────────────────────────────────────────────────
                  EXPERIA — Governança Digital Autônoma
                  Contato: Gabriel Lima | [WHATSAPP]
```

---

## Exemplos Pré-Calculados (para os 14 leads locais)

| Negócio          | Ticket | Perdas/mês | Receita Perdida | ROI c/ Experia |
| :--------------- | -----: | ---------: | --------------: | :------------: |
| Marmitaria       |   R$25 |         20 |       R$500/mês |     +0.6%      |
| Padaria          |   R$15 |         30 |       R$450/mês |     -9.5%      |
| Petshop          |   R$80 |          8 |       R$640/mês |     +28.8%     |
| Bazar            |   R$50 |         10 |       R$500/mês |     +0.6%      |
| Açougue          |   R$60 |         12 |       R$720/mês |     +44.9%     |
| Informática      |  R$200 |          5 |     R$1.000/mês |    +101.2%     |
| Oficina Mecânica |  R$300 |          4 |     R$1.200/mês |    +141.4%     |

> **Insight:** Negócios com ticket >R$80 têm ROI claramente positivo.
> Para tickets baixos (<R$50), posicionar como "tempo recuperado" em vez de ROI puro.
> O dono de marmitaria não perde lead — perde TEMPO respondendo.

---

## Argumento Alternativo (Ticket Baixo)

Quando o ROI financeiro puro é marginal, usar o argumento de TEMPO:

```
"Você gasta [X]h/dia respondendo WhatsApp.
São [X×30]h/mês. A R$[SALARIO_HORA]/h, isso custa R$[CUSTO_TEMPO].
O sistema libera esse tempo. Você pode usar pra [ATIVIDADE_CORE]."
```

---

## Comportamento
- Sempre calcula ANTES de apresentar preço (Sanduíche de Valor)
- Usa aversão à perda (Kahneman): "Quanto PERDE" > "Quanto ganha"
- Números reais, nunca inflados — honestidade gera confiança
- Se ROI não fecha, diz honestamente — e sugere permuta ou ajuste de escopo
- Output pronto para Canva/PDF em <5 minutos
