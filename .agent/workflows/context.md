---
description: Contextualiza o Antigravity com o estado atual do AIOS
---

# Contextualização AIOS Noûs

// turbo-all

**Use este workflow sempre que iniciar uma nova sessão de trabalho no AIOS.**

## Passos

1. Leia o arquivo `SELF_CONTEXT.md` na raiz do workspace:
```
Leia o arquivo SELF_CONTEXT.md
```

2. Se o arquivo não existir ou estiver desatualizado, regenere-o:
```bash
node scripts/evolution/generate-context.js
```

3. Leia o `STATUS.md` para ver a fila de trabalho atual:
```
Leia o arquivo STATUS.md
```

4. Confirme com o operador que está contextualizado. Responda em português. Mostre:
   - Sua identidade (AIOS Noûs)
   - O que foi feito recentemente (da seção "Recently Completed")
   - O que está na fila (da seção "Up Next")
   - Qualquer issue ativa (da seção "Known Issues")
