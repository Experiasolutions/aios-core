# 🏥 Experia AGI — Guia de Comandos (Claude Code)

Este guia rápido mostra como acessar e operar o **Experia Enterprise OS** diretamente pelo seu terminal com Claude Code.

---

## 🚀 Como Iniciar

1. **Abra o terminal** na pasta do projeto:
   ```bash
   cd "c:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai"
   ```

2. **Inicie o Claude Code** (se ainda não estiver rodando).

---

## 🕹️ Comandos de Ativação (Slash Commands)

Use estes comandos para "vestir a persona" de cada agente especializado.

| Comando | Agente | Função Principal |
|---------|--------|------------------|
| `/experia-master` | 🏥 **Master** | Comece aqui! Orquestração e Onboarding. |
| `/experia-architect` | 📐 **Architect** | Diagnóstico e Planos de Ação. |
| `/experia-copy` | 💬 **Copy** | Criação de Scripts e FAQs. |
| `/experia-data` | 📊 **Data** | Métricas e Dashboards. |
| `/experia-security` | 🛡️ **Security** | Validação LGPD e Riscos. |
| `/experia-automations`| ⚙️ **Automations**| Construção Técnica. |
| `/experia-integrations`| 🔌 **Integrations**| Design de Eventos e APIs. |
| `/experia-validator` | ✅ **Validator** | Check final antes do deploy. |

---

## 📝 Fluxo Típico de Trabalho

### 1. Onboarding de Nova Clínica
Para iniciar um novo cliente:
1. Digite `/experia-master`
2. Digite `*onboard NomeDaClinica`
3. O Master vai te entrevistar para preencher o Brief.

### 2. Criar Scripts de Venda
Se precisar de scripts de WhatsApp:
1. Digite `/experia-copy`
2. Digite `*script whatsapp estética`
3. O Copy vai gerar os textos baseados nas melhores práticas.

### 3. Validar Segurança (LGPD)
Antes de colocar qualquer coisa no ar:
1. Digite `/experia-security`
2. Digite `*gate`
3. Responda o checklist para garantir conformidade.

---

## 📂 Acessando os Arquivos do Squad

Os arquivos fonte (se você quiser editar os prompts ou templates) estão em:
`squads/experia/`

- **Prompts dos Agentes:** `squads/experia/agents/*.md`
- **Checklists e Templates:** `squads/experia/templates/*.md`
- **Tarefas Padrão:** `squads/experia/tasks/*.md`

---

## 💡 Dicas Pro

- **Use `*help`**: Dentro de qualquer agente, digite `*help` para ver o que ele pode fazer.
- **Sair do Modo**: Digite `*exit` ou `/reset` para voltar ao normal.
- **Modo Verbosidade**: Se o agente estiver falando muito pouco, peça "seja mais detalhado".
