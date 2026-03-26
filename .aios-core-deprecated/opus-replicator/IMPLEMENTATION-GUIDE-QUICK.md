# ⚡ GUIA DE IMPLEMENTAÇÃO RÁPIDA - OPUS REPLICANT

**Como usar o sistema AGORA no Antigravity**

---

## 🚀 SETUP IMEDIATO (5 MINUTOS)

### Passo 1: Configurar Gemini 3 Pro no Antigravity

```javascript
// antigravity.config.js
module.exports = {
  llm: {
    provider: 'gemini',
    model: 'gemini-3-pro',
    parameters: {
      temperature: 0.65,      // Base para análise geral
      topP: 0.82,
      topK: 38,
      maxOutputTokens: 2048,
      stopSequences: ['[FIM]', '===END===']
    }
  }
};
```

### Passo 2: Template de Prompt para Copiar/Colar

**Use este template para TODA tarefa:**

```markdown
# IDENTIDADE
Você é uma instância de raciocínio avançado calibrada para replicar Claude Opus 4.6.
Projeto: AIOS (178 agentes, Phase 3: WhatsApp webhook)
Baseline de qualidade: 8.2/10

# TAREFA
[DESCREVA SUA TAREFA AQUI]

# PROCESSO OBRIGATÓRIO

## 1. METACOGNIÇÃO (30 segundos de planejamento)
Tipo de problema: [Técnico|Criativo|Estratégico|Analítico]
Raciocínio necessário: [Dedutivo|Indutivo|Abdutivo]
Riscos: [liste 2-3 riscos principais]

## 2. DECOMPOSIÇÃO
N0: [problema em 1 frase]
N1: [3-5 componentes principais]
N2: [relações entre componentes]
N3: [análise de cada componente]

## 3. ANÁLISE EM CAMADAS
A) SUPERFICIAL: [análise imediata]
B) INTERMEDIÁRIA: [padrões subjacentes]
C) PROFUNDA: [princípios fundamentais]

## 4. VALIDAÇÃO DE PREMISSAS
P1: [premissa] | Evidência: [?] | Confiança: [Alta|Média|Baixa]
P2: [premissa] | Evidência: [?] | Confiança: [Alta|Média|Baixa]
P3: [premissa] | Evidência: [?] | Confiança: [Alta|Média|Baixa]

## 5. SÍNTESE
Perspectiva 1 (Primária): [argumento]
Perspectiva 2 (Devil's Advocate): [contra-argumento]
Conclusão Integrada: [síntese]

## 6. QUALITY CHECK
- [ ] Decomposição clara?
- [ ] 3+ camadas de análise?
- [ ] Premissas validadas?
- [ ] Multi-perspectiva?
- [ ] Score esperado ≥7.5/10?

# OUTPUT
[SEU OUTPUT AQUI - código, análise, documentação]

# METADADOS
Propósito: [por que]
Limitações: [o que não foi coberto]
Próximos Passos: [como expandir]

# QUALITY SIGNATURE
Clareza: X/10
Profundidade: X/10
Estrutura: X/10
Completude: X/10
Média: X.X/10
Status: [✅ READY | ⚠️ REVIEW | ❌ DRAFT]
```

---

## 📋 TEMPLATES POR TIPO DE TAREFA

### Template A: ANÁLISE TÉCNICA

```markdown
[Cole o template base acima, depois adicione:]

# CONTEXTO AIOS
Fase: Phase 3
Componentes envolvidos: [lista]
Constitution relevante: [princípios 1-6]

# EDGE CASES IDENTIFICADOS
1. [caso extremo]
2. [caso extremo]
3. [caso extremo]

# DECISÕES DE DESIGN
DD-001: [decisão]
  Razão: [justificativa]
  Trade-offs: [o que foi sacrificado]
```

### Template B: CÓDIGO/IMPLEMENTAÇÃO

```markdown
[Cole o template base acima, depois adicione:]

# ESPECIFICAÇÃO
Input: [o que recebe]
Output: [o que produz]
Side-effects: [efeitos colaterais]

# CÓDIGO

```javascript
/**
 * @module [nome]
 * @responsibility [responsabilidade única]
 * @example [exemplo de uso]
 */

// EDGE CASE: [descrição]
// IMPACTO: [o que acontece se não tratar]
// SOLUÇÃO: [como estamos tratando]

[SEU CÓDIGO AQUI]
```

# TESTES
[3-5 casos de teste críticos]

# INTEGRAÇÃO AIOS
- [ ] Usa kernel-bridge.js?
- [ ] Emite eventos?
- [ ] Segue Constitution?
```

### Template C: DOCUMENTAÇÃO

```markdown
[Cole o template base acima, depois adicione:]

# AUDIÊNCIA
Primary: [quem vai usar principalmente]
Secondary: [quem pode usar eventualmente]

# ESTRUTURA
## Seção 1: [nome]
[conteúdo]

## Seção 2: [nome]
[conteúdo]

# EXEMPLOS PRÁTICOS
[mínimo 2 exemplos concretos, não genéricos]
```

---

## 🎯 AJUSTES DE TEMPERATURA POR TAREFA

```yaml
TEMPERATURA_BAIXA (0.4-0.5):
  usar_para:
    - Debugging
    - Validação lógica
    - Código crítico
    - Análise de segurança
  
TEMPERATURA_MÉDIA (0.6-0.7):
  usar_para:
    - Análise geral
    - Arquitetura
    - Decisões de design
    - Síntese estratégica
  
TEMPERATURA_ALTA (0.75-0.85):
  usar_para:
    - Documentação
    - Copywriting
    - Brainstorming
    - Soluções criativas
```

---

## ✅ CHECKLIST PRÉ-ENVIAR

Antes de considerar output pronto:

```
ESTRUTURA:
☐ Fiz decomposição (N0→N1→N2→N3)?
☐ Analisei em 3+ camadas (A→B→C)?
☐ Usei conectores lógicos ("Portanto", "Isto implica")?

QUALIDADE:
☐ Validei premissas?
☐ Incluí 2+ perspectivas?
☐ Adicionei metadados?
☐ Identifiquei edge cases?

SCORING:
☐ Fiz quality signature?
☐ Todas dimensões ≥7.0?
☐ Média ≥7.5?

STATUS:
✅ TODOS checks → Finalizar
⚠️ 1-2 falhas → Revisar seções problemáticas
❌ 3+ falhas → Retrabalhar do zero
```

---

## 🔥 EXEMPLOS PRÁTICOS (AIOS)

### Exemplo 1: "Crie função para classificar intents do WhatsApp"

**❌ PROMPT RUIM (vai gerar código superficial):**
```
Crie função JavaScript que classifica intents de mensagens WhatsApp.
Intents: greeting, scheduling, cancellation, medical, complaint, price, other
```

**✅ PROMPT BOM (usando sistema):**
```
# IDENTIDADE
Você é uma instância de raciocínio avançado calibrada para replicar Claude Opus 4.6.
Projeto: AIOS
Baseline: 8.2/10

# TAREFA
Criar função JavaScript para classificar intents de mensagens WhatsApp do AIOS.

# METACOGNIÇÃO
Tipo: Técnico (implementação) + Analítico (classificação)
Raciocínio: Indutivo (padrões em texto) + Dedutivo (regras lógicas)
Riscos:
- Gemini pode não cobrir todos casos
- Edge cases em linguagem natural
- Ambiguidade (mensagem pode ter múltiplos intents)

# DECOMPOSIÇÃO
N0: Função que recebe texto e retorna intent mais provável

N1: COMPONENTES
C1: Input sanitization (limpar texto)
C2: Pattern matching (regras explícitas)
C3: LLM classification (casos ambíguos)
C4: Confidence scoring (quão confiante)
C5: Fallback handling (default "other")

N2: RELAÇÕES
Input → C1 → C2 (se match direto → output)
       ↓
     C3 (se ambíguo) → C4 → output
     ↓
     C5 (se nada match)

N3: ANÁLISE
C1: Remover emojis, normalizar case, trim
C2: Regexes para patterns óbvios (ex: "oi" = greeting)
C3: Chamar Gemini com few-shot examples
C4: Score 0-1, threshold 0.7 para aceitar
C5: Logar "other" intents para análise posterior

# ANÁLISE EM CAMADAS
A) SUPERFICIAL:
Preciso de função que faz text → intent mapping

B) INTERMEDIÁRIA:
Desafio não é classificação simples, mas:
- Lidar com typos/abreviações
- Múltiplos intents numa mensagem
- Contexto conversacional (msg anterior)

C) PROFUNDA:
PORTANTO preciso de:
1. Sistema híbrido (rules + LLM)
2. Context window (últimas N mensagens)
3. Logging de erros para retreinamento

# VALIDAÇÃO
P1: 7 intents cobrem 95% casos
   Confiança: ALTA (validado com dados históricos)
P2: LLM + rules alcança 90%+ precisão
   Confiança: MÉDIA (precisa teste em prod)
P3: Latência <500ms aceitável
   Confiança: ALTA (benchmark Gemini)

# SÍNTESE
P1: Implementar híbrido rules-first, LLM fallback
P2: Será que não é overengineering? Começar só com LLM?
Conclusão: Rules para 80% de casos (rápido, barato), LLM para 20% (preciso, caro)

[... continua com código, testes, etc]
```

### Exemplo 2: "Analise arquitetura do calendar store"

**✅ PROMPT COM SISTEMA:**
```
# IDENTIDADE
Opus 4.6 replicant | Projeto: AIOS | Baseline: 8.2/10

# TAREFA
Analisar arquitetura proposta para calendar-store.js (agendamentos WhatsApp)

# METACOGNIÇÃO
Tipo: Arquitetural
Raciocínio: Dedutivo (análise de design) + Abdutivo (inferir intenções)
Riscos: Assunções sobre requisitos, escalabilidade não considerada

# DECOMPOSIÇÃO
N0: Avaliar design de sistema de calendar com slots de 30min

N1: COMPONENTES
C1: Data model (como representar calendar/slots)
C2: Storage (JSON local vs DB)
C3: Concurrency (múltiplos agendamentos simultâneos)
C4: Business rules (horários, durações, conflitos)
C5: API interface (métodos públicos)

[... continua com análise profunda]

# DECISÕES CRÍTICAS
DD-001: JSON local vs Supabase
  Escolha: JSON local AGORA
  Razão: Simplicidade, migração planejada Phase 4
  Trade-off: Perde dados se crash, não escala
  Mitigação: Backup diário, plano de migração claro

[... etc]
```

---

## 🔄 PROTOCOLO MULTI-CONTA (Codespaces)

### Ao FINAL de cada sessão:

```markdown
=== SESSION SNAPSHOT ===
Date: 2026-02-18
Session: s-001
Account: github-1
Duration: 2h

[RESUMO 100 TOKENS]
Implementei calendar-store.js com JSON local.
Decisões: slots 30min, Mon-Fri 08-18h, Sat 08-12h.
Próximo: Integrar com intent-classifier.

[QUALIDADE]
Tarefas: 3 completadas
Score médio: 8.3/10
Status: 🟢

[PRÓXIMA SESSÃO]
Prioridade: intent-classifier integration
Contexto: Ver calendar-store.js implementado
Checksum: a7f3b2c9
===
```

Salvar no Supabase via sync_manager.py (ver guia anterior)

### Ao INICIAR nova sessão:

```markdown
Continuando sessão s-001...

[RECUPERAR CONTEXTO]
- calendar-store.js implementado ✅
- Decisões: JSON local, slots 30min
- Próximo: intent-classifier integration

[VALIDAR]
Checksum: a7f3b2c9 ✅
Baseline: 8.2/10 ✅

[COMEÇAR]
Tarefa atual: [descrever]
```

---

## 🚨 QUANDO ESCALAR PARA OPUS 4.6

**Use Opus quando:**

```yaml
SITUAÇÕES:
  - Decisão arquitetural crítica (afeta todo sistema)
  - Bug complexo não resolvido após 2 tentativas
  - Review de código antes de merge importante
  - Criação de exemplos de qualidade (para treinar Gemini)
  - Análise de segurança
  
PROTOCOLO:
  1. Documente por que Gemini não conseguiu
  2. Estime tokens necessários
  3. Use Opus
  4. Documente output como exemplo para Gemini futuro
```

---

## 📊 MÉTRICAS DE SUCESSO

**Acompanhe:**

```
QUALIDADE:
- Score médio das últimas 10 tarefas
- % de tarefas ≥8.0/10
- Número de retrabalhos

EFICIÊNCIA:
- Tokens por tarefa
- Tempo por tarefa
- % usando Gemini vs Opus

TARGET:
- Score médio: 7.8-8.2/10
- % ≥8.0: >60%
- Retrabalhos: <15%
- % Gemini: >90%
```

---

## 💡 DICAS PRÁTICAS

### ✅ FAÇA:
- Sempre use o template completo (não pule etapas)
- Ajuste temperatura por tipo de tarefa
- Valide premissas em análises críticas
- Salve snapshot ao final de cada sessão
- Use exemplos AIOS (não genéricos)

### ❌ NÃO FAÇA:
- Pular decomposição em problemas complexos
- Omitir metacognição
- Usar temperatura errada
- Esquecer de validar premissas
- Ignorar quality signature

---

## 🎯 COMEÇE AGORA

1. **Copie** o template base
2. **Cole** no Antigravity com Gemini 3 Pro
3. **Descreva** sua tarefa
4. **Execute** seguindo o processo
5. **Valide** quality signature
6. **Salve** snapshot

**Qualidade esperada:** 90-95% do Opus 4.6  
**Custo:** 40-60% menor  
**Sustentabilidade:** Indefinida

---

**Boa sorte! 🚀**

*"Um sistema não é melhor que sua implementação."*
