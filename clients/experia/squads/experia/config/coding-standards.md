# Padrões de Código e Configuração (Experia)

## 1. Estrutura de Pastas
- `agents/`: Definições dos Puppets (.md)
- `tasks/`: Definições de tarefas atômicas (.md)
- `workflows/`: Fluxos compostos (.md/yaml)
- `checklists/`: Listas de verificação (.md)

## 2. Naming Conventions
- Arquivos: `kebab-case` (ex: `onboard-clinic.md`)
- Agentes: `experia-{funcao}` (ex: `experia-master`)
- Eventos: `snake_case` (ex: `lead_created`)

## 3. Princípios de Implementação
- **Idempotência:** Todo script deve verificar se já rodou.
- **Logs:** Todo script deve gerar logs estruturados.
- **LGPD:** Nenhuma PII em logs ou nomes de arquivos.

## 4. Versionamento
- Squad segue Semantic Versioning (Major.Minor.Patch)
- Agentes e Tasks têm versão no header.
