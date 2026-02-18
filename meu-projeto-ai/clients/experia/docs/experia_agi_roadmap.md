# Experia AGI - Roadmap de Implementação com AIOS

Este documento descreve o plano estratégico para transformar a visão da "Mente Mestre Experia AGI" em um sistema operacional funcional utilizando a tecnologia Synkra AIOS.

## 1. Visão Geral e Mapeamento

O objetivo é criar um **Sistema Operacional de Agentes (OS)** que gerencia clínicas automaticamente. A arquitetura original descreve um "Master of Clinics" e vários "Puppets" especializados.

### De: Conceito Experia -> Para: Arquitetura AIOS

| Conceito Experia | Componente AIOS Correspondente | Descrição |
| :--- | :--- | :--- |
| **Mente Mestre (Master of Clinics)** | `agents/experia-master.md` | O orquestrador central. Recebe demandas de alto nível e delega. |
| **Puppets (Arquiteto, Copy, Dados...)** | `agents/experia-{role}.md` | Agentes especializados que executam tarefas específicas sob comando do Master. |
| **DNA / Constituição** | `prompts/system/experia-core.md` | O System Prompt imutável que define a personalidade e regras de ouro. |
| **Memória Central** | `knowledge/experia-kb.md` | A base de conhecimento (4 Pilares, Dores, Scripts). |
| **Sistema Nervoso (Crítico)** | `workflows/review-loop.yaml` | Workflow de validação onde um agente revisa o trabalho do outro. |
| **Braços e Pernas (Automação)** | `tasks/` e Scripts (`.js`/`.py`) | Scripts executáveis que interagem com APIs (WhatsApp, CRMs). |

---

## 2. Fases de Implementação

### Fase 1: Fundação (O Cérebro)
**Objetivo:** Criar o Agente Mestre e a Base de Conhecimento.

1.  **Criar `docs/experia/knowledge/core.md`**:
    *   Consolidar "A Religião", "4 Pilares", "Regras de Ouro" em um arquivo de KB.
2.  **Criar Agente `experia-master`**:
    *   Definir persona "Gerente de Operações".
    *   Configurar acesso à KB.
    *   Implementar comandos básicos de orquestração.
3.  **Estabelecer Workflows Básicos**:
    *   `*experia-onboard`: Workflow de entrada de nova clínica.

### Fase 2: O Corpo (Os Puppets)
**Objetivo:** Criar os agentes especialistas para execução.

1.  **Agente `experia-architect`** (Arquiteto de Solução):
    *   Especialista em criar o "Plano de 3 Fases".
2.  **Agente `experia-copy`** (Copy & Conversas):
    *   Especialista em scripts de vendas e humanização.
3.  **Agente `experia-data`** (Data & Insights):
    *   Especialista em métricas e análise de logs.
4.  **Agente `experia-security`** (Segurança & LGPD):
    *   O "Gatekeeper" que veta ações inseguras.

### Fase 3: O Sistema Nervoso (Workflows & Loops)
**Objetivo:** Implementar a auto-correção e automação.

1.  **Workflow de Criação de Conteúdo**:
    *   `Master` define o objetivo -> `Copy` cria -> `Security` valida -> `Master` aprova.
2.  **Workflow de Análise de Dados**:
    *   `Master` solicita relatório -> `Data` processa logs -> `Architect` sugere melhorias.

### Fase 4: Braços (Integração Externa)
**Objetivo:** Conectar com o mundo real (WhatsApp, CRMs).

1.  **Integração WhatsApp API**:
    *   Scripts para envio/recebimento de mensagens.
2.  **Integração Planilhas/CRM**:
    *   Agentes capazes de ler/escrever em "bancos de dados" (arquivos locais ou APIs).

---

## 3. Estrutura de Diretórios Sugerida

Recomendamos organizar o projeto Experia dentro do AIOS da seguinte forma:

```
aios-core/
├── experia/
│   ├── agents/          # Definições dos Agentes (Master + Puppets)
│   ├── knowledge/       # A "Memória Central"
│   ├── workflows/       # Processos definidos (ex: Onboarding, Crise)
│   ├── templates/       # Scripts de vendas, contratos, emails
│   └── scripts/         # Código Python/Node para automações reais
```

## 4. Próximos Passos Imediatos

Para começar agora, sugere-se:

1.  [ ] Migrar o conteúdo de "Master of Clinics— ExperIA Enterprise OS (v1.0).md" para um novo agente AIOS `experia-master`.
2.  [ ] Criar a estrutura de pastas `experia/`.
3.  [ ] Testar o `experia-master` com um comando de teste (ex: `*experia-plan` parar criar um plano para uma clínica fictícia).
