---
checklist: Pre-Deploy Checklist
---

# ✅ Pre-Deploy Checklist (Experia)

## 1. Segurança & LGPD (Bloqueante)
- [ ] Dados coletados são estritamente necessários?
- [ ] Nenhum dado sensível (D3) sendo trafegado sem criptografia/máscara?
- [ ] Logs de automação estão sanitizados (sem PII)?
- [ ] Token de acesso não está hardcoded?

## 2. Confiabilidade (Bloqueante)
- [ ] Idempotência testada (evento duplicado não gera ação duplicada)?
- [ ] Retry policy configurada (3 tentativas)?
- [ ] Dead Letter Queue (DLQ) ou fila de falhas definida?
- [ ] Alertas de erro críticos configurados?

## 3. Negócio e Qualidade
- [ ] Scripts aprovados pelo cliente?
- [ ] Fluxo de "não entendi" ou "falar com humano" funciona?
- [ ] Métricas de sucesso (conversão/SLA) estão sendo medidas?
- [ ] Dashboards refletem os dados reais?

## 4. Rollback
- [ ] Plano de rollback definido (como desligar em 1 min)?
- [ ] Versão anterior está disponível?
