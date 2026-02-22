---
task: Security Assessment
responsavel: "@experia-security"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - fluxo: Descrição do fluxo a avaliar
  - dados: Quais dados são coletados
  - destinos: Onde dados são armazenados
Saida: |
  - classificacao: Risco Baixo/Médio/Alto
  - checklist: Itens verificados com ✅/❌
  - decisao: GO / NO-GO / GO com condições
  - acoes: Ações corretivas se necessário
---

# *assess — Avaliação de Segurança & LGPD

## Classificação de Dados

| Nível | Tipo | Exemplos |
|-------|------|----------|
| D0 | Público | Nome da clínica, endereço, redes |
| D1 | Operacional | Horários, scripts, regras |
| D2 | Pessoal | Nome + telefone do lead |
| D3 | Sensível | Dados de saúde, diagnóstico |

## Checklist Gate

- [ ] Dados coletados = mínimo necessário
- [ ] Sem D3 sem justificativa
- [ ] Mascaramento aplicado em logs
- [ ] Retenção definida
- [ ] Tokens fora de prompts/logs
- [ ] Opt-out fácil
- [ ] Frequência anti-spam

## Poder de Veto

Se risco ALTO: **interromper** → apontar → exigir ajustes → só liberar após correção.
