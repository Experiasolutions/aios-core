# Analise do Código Fonte Claude-Code (v2.1.88)

## 📌 Visão Geral
Este repositório contém o código-fonte descompilado (TypeScript) do CLI da Anthropic, **Claude Code**. Com quase 2000 arquivos e 500.000 linhas de código, é a base da tecnologia de agente local em que o próprio Anthropic se baseia.

Para nós no ecosistema **KAIROS** e **AIOX**, é uma "mina de ouro" porque expõe implementações em produção de arquiteturas de orquestração multiplataforma, compressão avançada de contexto e dezenas de ferramentas utilitárias prontas (+ de 40 implementadas).

---

## 💎 O Que Tem Mais Valor para KAIROS?

### 1. Sistema de Ferramentas (Tool System) (`src/tools/`)
Possui implementações sofisticadas de mais de 40 ferramentas. Algumas que valem muito a pena investigar e potencialmente portar ou adaptar para o Arsenal KAIROS:
- **Ferramentas de Arquivo e Busca:** `GlobTool`, `GrepTool`, `FileEditTool` (regex ou replace direcional), `FileReadTool`.
- **Ferramentas de Agente (Sub-agentes):** `AgentTool` (para spawn de sub-agentes), `TeamCreateTool` / `TaskCreateTool` e mecanismos de troca de mensagem multipla, essenciais para squads AIOX e Mindclones.
- **Ferramentas de MCP:** Implementações otimizadas via `MCPTool`, `ListMcpResourcesTool` e `ReadMcpResourceTool` provendo o invólucro perfeito sobre o protocolo MCP e gerenciando auth.

### 2. Compressão e Context Management (`src/services/compact/`)
Lida de maneira super inteligente com a "janela de contexto". O Claude usa três estratégias:
- **autoCompact:** Sumariza chamadas velhas a API utilizando LLM.
- **snipCompact:** Remove mensagens inúteis (zombies).
- **contextCollapse:** Uma reconstrução sofisticada de memória baseada na relevância, muito similar ao nosso objetivo com Synapse e Jarvis.

### 3. A Camada "Query Engine" e "Orchestration" (`src/QueryEngine.ts`)
O fluxo do evento (loop do agente):
`Process Input` ➡️ `System Prompt Builder` ➡️ `API Call (Streaming)` ➡️ `Execution (Parallel/Series)` ➡️ `State Resume`
- **StreamingToolExecutor:** Permite que ferramentas do LLM sejam executadas de maneira assíncrona/paralela quando for seguro. Este nível de execução melhoraria grandemente a velocidade das nossas tarefas.

### 4. Modo Prompts e 'Undercover' (`docs/` & templates)
- Eles possuem flags `feature()` que ativam lógicas remotas, sistema "Buddy" e prompts secretos.
- Os prompts em texto puro utilizados como "System Prompts" pelo Claude internamente servirão para refinar drasticamente as instruções do Mestre NOESIS, dos Squads e os nossos Guidelines de System Prompt, revelando a tática real da Anthropic de criar limites e evitar alucinações.

### 5. Arquitetura de "Bridge" Remota (`src/bridge/`)
O modelo conecta o agente local a uma versão "desktop" corporativa para processamento offload. Muito semelhante à necessidade híbrida do SKYDRA entre local e cloud (OpenShift).

---

## 🚀 Recomendações de Próximos Passos (Next Steps)

> [!TIP]
> Podemos extrair diretamente estes módulos ou referenciá-los para aprimorar o KAIROS!

1. **Extração de Prompts Internos:** Ler nos arquivos `cli.js` ou dentro de certas rotinas os meta-prompts do Claude Code.
2. **Revisar `FileEditTool` / `GrepTool`**: Analisar a exata implementação que usam, pois são famosos por terem a melhor capacidade de edição de arquivos via LLM do mercado hoje.
3. **Estudar a lógica Assíncrona do `StreamingToolExecutor`**: Para aplicarmos em nossas *Workflows* de execução paralela permitindo o *Engine Triage* de KAIROS rodar 5x mais rápido.
