# 📝 Post para Grupo da Comunidade AIOS

## Versão WhatsApp/Telegram (curta — 280 chars):

Pessoal, montei 3 ferramentas usando o AIOS nos últimos 10 dias e quero devolver pra comunidade:

🧬 Opus Replicant — protocolo que força profundidade real em qualquer LLM (5 regras, 3 modos)
📋 RP-MCP Protocol — intent documents antes de tarefas complexas (adeus retrabalho)
🔧 Engine/Client Separation — padrão pra atender múltiplos clientes sem misturar domínios

Tudo MIT, funciona com AIOS v3.9+, qualquer LLM.
Quem quiser testar, me chama que eu envio os arquivos.

---

## Versão Completa (para grupo maior ou post em comunidade):

Fala pessoal! 👋

Sou o Gabriel, operador AIOS no Grande ABC (SP). Nos últimos 10 dias montei um sistema em cima do AIOS chamado KAIROS e quero devolver 3 ferramentas que mais fizeram diferença no meu dia a dia:

---

### 🧬 1. Opus Replicant Engine
Protocolo de raciocínio que força 3 camadas de análise em toda resposta do LLM:
- Camada Imediata (responde o que foi perguntado)
- Camada Estrutural (analisa premissas e trade-offs)
- Camada Estratégica (conecta com contexto maior)

**Resultado:** minha taxa de retrabalho caiu ~60%. Outputs saem certos na primeira.

Inclui: spec completa (1500+ linhas), guia rápido, 3 modos de raciocínio (PM1/PM2/PM3), guardrails.

---

### 📋 2. Protocolo RP-MCP
Em tarefas complexas, antes de executar, você cria um "Intent Document" de 2 min que define:
- O que significa "sucesso"?
- O que pode dar errado?
- Que ferramentas serão usadas?
- O que está FORA do escopo?

**Resultado:** eliminei a situação "tarefa pronta mas não era isso".

---

### 🔧 3. Engine/Client Separation
Padrão pra quem quer atender mais de 1 cliente:
- squads/ = motor (genérico, nunca referencia cliente)
- clients/nome/ = aplicação (específica, isolada)

**Resultado:** testado com 350+ arquivos, zero contaminação entre clientes.

---

Tudo MIT, funciona com AIOS v3.9+, qualquer LLM (Gemini, Claude, GPT, Groq).

Quem tiver interesse, me manda mensagem que eu compartilho os arquivos. Também aceito feedback e sugestões de melhoria.

🙏 Obrigado ao Pedro e ao Alan por criarem a base que permitiu tudo isso.

— Gabriel Lima | @experiasolutions
