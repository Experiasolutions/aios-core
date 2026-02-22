# Security Gate Checklist

> **Responsável:** @doom-security
> **Quando usar:** Antes de publicar saídas, fazer deploys, ou processar dados sensíveis.

## OPA / Policy-as-Code
- [ ] Policies aplicáveis identificadas
- [ ] Rego rules executadas contra a saída
- [ ] Zero violations críticas
- [ ] Warnings documentados e aceitos

## Privacy Budget
- [ ] Cota disponível para operação
- [ ] Dados mínimos necessários documentados
- [ ] Fallback para dados sintéticos configurado (se cota estourar)
- [ ] Log de consumo registrado

## SBOM / SLSA
- [ ] Bill of Materials atualizado (se software)
- [ ] Supply chain integrity verificada
- [ ] Dependencies auditadas

## C2PA Manifest
- [ ] Manifesto de proveniência gerado para cada criativo
- [ ] Fontes documentadas
- [ ] Direitos verificados
- [ ] Prompts principais registrados

## Red Team
- [ ] Self-Play adversarial executado (se operação crítica)
- [ ] Vulnerabilidades mapeadas
- [ ] Patches aplicados ou aceitos com justificativa

## Compliance
- [ ] Sem promessas proibidas ou enganosas
- [ ] LGPD/GDPR: dados classificados (D0-D3)
- [ ] Stealth-compliance: verificação sem overhead
- [ ] Auditoria trail completa

## Resultado
- **Todos os checks ✅:** → **LIBERADO** 🟢
- **Warning com aceite:** → **LIBERADO COM RESSALVA** 🟡
- **Violation crítica:** → **VETADO** 🔴 (poder de veto exercido)
