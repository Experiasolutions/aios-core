# 🧠 Integração AIOS & Experia: Guia de Evolução e Auto-Inovação

Este documento detalha como os **Agentes Originais do AIOS** se conectam ao **Squad Experia** e define a estratégia para que o sistema se torne uma AGI auto-evolutiva.

---

## 1. O "Exército Original" do AIOS e a Experia

Enquanto o Squad Experia (`@experia-*`) cuida da **operação das clínicas**, os agentes originais do AIOS (`@pm`, `@dev`, etc.) cuidam da **evolução da própria Experia como produto**.

Imagine que a Experia é uma "Fábrica de Operações".
- **Squad Experia** = Os operários na linha de montagem atendendo clientes.
- **Squad Core (AIOS)** = A engenharia que constrói e melhora a fábrica.

| Agente AIOS | Papel Original | Aplicação na Experia (Contexto Interno) |
|-------------|----------------|-----------------------------------------|
| 👑 **@aios-master** | Orquestrador | **O "CEO" da AGI.** Ele cria novos agentes, modifica processos e ordena a auto-evolução. É quem você chama para dizer: "Crie um novo Puppet para Financeiro". |
| 🚀 **@pm** (Morgan) | Product Manager | **Gerente de Produto Experia.** Define o roadmap da plataforma. "O que vamos construir no Q3? Suporte a voz? Dashboard IA?". Ele cria Epics e Stories. |
| 🤝 **@po** (Pax) | Product Owner | **Voz do Mercado.** Analisa o que as clínicas estão pedindo e prioriza o backlog. Garante que estamos construindo o que dá lucro. |
| 🏗️ **@architect** | Arquiteto | **CTO da Experia.** Decide tecnologias. "Vamos migrar do Make para n8n?", "Qual Vector DB usar?". Desenha a arquitetura de novos módulos complexos. |
| 💻 **@dev** (Dex) | Developer | **Engenheiro de Software.** Constrói as ferramentas internas, scripts complexos em Python/JS, e integrações que o `@experia-integrations` apenas desenha. |
| 🧪 **@qa** (Quinn) | Quality Assurance | **Auditor da Plataforma.** Cria testes automatizados para garantir que o Experia OS não quebre. Testa se os agentes estão seguindo as regras. |
| ☁️ **@devops** (Gage) | DevOps Engineer | **Infraestrutura.** Cuida dos servidores onde o Experia roda (Docker, AWS, n8n self-hosted). Garante uptime e escalabilidade. |
| 🔍 **@analyst** (Atlas) | Analista de Negócios| **Pesquisador.** "Quais as tendências de IA para odonto?", "O que os concorrentes estão fazendo?". Alimenta a estratégia com dados. |
| 🎨 **@ux** (Pixel) | UX Designer | **Experience Designer.** Melhora a usabilidade dos dashboards que entregamos para as clínicas e os relatórios internos. |

---

## 2. Estratégia de Auto-Inovação (Self-Innovation)

Para que a Experia não seja estática e evolua sozinha (AGI), implementamos o **Ciclo de Inovação AIOS**.

### O Ciclo de Feedback (Reflection Loop)

A AGI precisa observar a si mesma, criticar e melhorar.

1.  **Observação (Data):** O `@experia-data` e `@experia-validator` geram logs de falhas e sucessos. "Por que perdemos 30% dos leads na etapa X?"
2.  **Análise (@analyst):** O `@analyst` processa esses logs periodicamente. "Padrão detectado: scripts longos demais causam abandono."
3.  **Ideação (@pm + @architect):** O `@pm` cria uma história: "Otimizar scripts para brevidade". O `@architect` propõe: "Implementar analisador de sentimento em tempo real".
4.  **Implementação (@aios-master):** O Master ordena a mudança. "Modificar `@experia-copy` para impor limite de caracteres."
5.  **Teste (@qa):** O `@qa` valida se a mudança resolveu sem quebrar nada.

### Como Executar a Auto-Evolução

#### A. Criar Novos Puppets (Escalabilidade Horizontal)
Quando você perceber uma nova necessidade recorrente (ex: Financeiro), não faça manual. Peça pro Master:
> `@[/aios-master] *create agent experia-finance`
> "Crie um agente para conciliação bancária de clínicas..."

O Master vai gerar o arquivo `.md`, criar tasks e integrar ao squad.

#### B. Melhorar Processos (Refinamento)
Se um processo está ruim, use o Master para modificar o framework:
> `@[/aios-master] *modify task onboard-clinic.md`
> "Adicione uma etapa de verificação de CRM..."

#### C. IDS (Incremental Development System)
O AIOS possui um sistema de governança (IDS). Tudo que é criado é registrado.
- Antes de criar algo novo, o Master verifica (`*ids check`) se já existe.
- Isso evita que a AGI vire um "monstro de Frankenstein" com partes duplicadas.

---

## 3. Exemplo Prático: Introduzindo "Suporte a Voz"

**Cenário:** Clínicas querem atender ligações via IA de voz.

1.  **Pesquisa:** `@[/analyst] *research "AI voice agents for clinics"`
2.  **Epico:** `@[/pm] *create-epic "Suporte a Voz Nativo"`
3.  **Arquitetura:** `@[/architect] *design "Integração Vapi.ai com Experia"`
4.  **Construção:** `@[/dev] *implement "Webhook handler para Vapi"`
5.  **Novo Puppet:** `@[/aios-master] *create agent experia-voice` (Especialista em Voz)
6.  **Deploy:** `@[/devops] *deploy "Serviço de Voz"`

Assim, a Experia evoluiu de "Texto" para "Texto + Voz" usando sua própria inteligência interna.
