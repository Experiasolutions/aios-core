---
checklist: LGPD Gate Checklist
---

# 🛡️ LGPD Gate Checklist

**Objetivo:** Garantir que nenhum fluxo viole princípios de proteção de dados.

## Minimização de Dados
- [ ] O fluxo coleta APENAS o necessário para o objetivo imediato?
- [ ] Se coleta CPF/RG, há justificativa legal documentada?
- [ ] Se coleta dados de saúde, há criptografia e controle de acesso rigoroso?

## Transparência e Consentimento
- [ ] O usuário sabe que está falando com uma automação (se aplicável)?
- [ ] O usuário tem opção clara de opt-out (sair da lista)?
- [ ] O termo de privacidade está disponível/linkado?

## Segurança da Informação
- [ ] Credenciais (API Keys) estão em variáveis de ambiente?
- [ ] Logs não registram conteúdo das mensagens (apenas metadados)?
- [ ] O acesso aos dados é restrito a quem precisa (Role Based Access)?

## Ciclo de Vida
- [ ] Existe política de retenção (por quanto tempo guardamos)?
- [ ] Existe processo de exclusão se o usuário solicitar?
