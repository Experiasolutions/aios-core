# Guia: Configurar ClickUp API + Instagram Graph API

## 1. ClickUp API

### Passo 1: Criar Workspace
1. Acesse [app.clickup.com](https://app.clickup.com)
2. Crie um workspace chamado **"Experia"**
3. Crie estes Spaces:
   - **CRM** (leads, deals)
   - **Marketing** (campanhas, posts)
   - **Operações** (processos, manutenção)
   - **CS** (tickets, NPS)

### Passo 2: Gerar API Token
1. Clique no seu avatar (canto inferior esquerdo)
2. **Settings** → **Apps** → **API Token**
3. Clique em **Generate** → copie o token
4. Cole no arquivo `.env` do projeto como `CLICKUP_API_KEY=pk_xxxxx`

### Passo 3: Anotar IDs
Após criar o workspace, anote:
- **Team ID** (URL: `app.clickup.com/{team_id}/...`)
- **Space IDs** (cada space tem um ID)
- **List IDs** (listas dentro dos spaces)

> **Dica:** Rode `curl -H "Authorization: pk_SEUTOKEN" https://api.clickup.com/api/v2/team` para pegar o Team ID via API.

---

## 2. Instagram Graph API

### Passo 1: Requisitos
- Conta Instagram **Business** (não pessoal)
- Página do Facebook vinculada à conta Instagram
- App no Meta for Developers

### Passo 2: Criar App no Meta
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. **My Apps** → **Create App** → **Business**
3. Nome: `Experia AIOS`
4. Em **Add Products** → adicione **Instagram Graph API**

### Passo 3: Obter Token
1. No painel do app → **Tools** → **Graph API Explorer**
2. Selecione seu app
3. Em **Permissions**, adicione:
   - `instagram_basic`
   - `instagram_content_publish`
   - `instagram_manage_insights`
   - `pages_show_list`
   - `pages_read_engagement`
4. Clique **Generate Access Token**
5. **IMPORTANTE:** Gere um **Long-Lived Token** (60 dias):
   ```
   GET https://graph.facebook.com/v19.0/oauth/access_token?
     grant_type=fb_exchange_token&
     client_id={APP_ID}&
     client_secret={APP_SECRET}&
     fb_exchange_token={SHORT_TOKEN}
   ```

### Passo 4: Obter Instagram Business Account ID
```bash
curl -X GET "https://graph.facebook.com/v19.0/me/accounts?access_token={TOKEN}"
```
Isso retorna a Page ID. Depois:
```bash
curl -X GET "https://graph.facebook.com/v19.0/{PAGE_ID}?fields=instagram_business_account&access_token={TOKEN}"
```

### Passo 5: Salvar no .env
```
INSTAGRAM_ACCESS_TOKEN=EAAxxxxxxx
INSTAGRAM_BUSINESS_ID=17841xxxxx
META_APP_ID=123456
META_APP_SECRET=abc123
```

---

## 3. Checklist

- [ ] ClickUp workspace "Experia" criado
- [ ] ClickUp API token gerado e salvo no `.env`
- [ ] ClickUp Team ID e Space IDs anotados
- [ ] Conta Instagram Business ativa
- [ ] Meta App "Experia AIOS" criado
- [ ] Instagram Graph API token gerado
- [ ] Instagram Business ID obtido
- [ ] Todos os tokens salvos no `.env`
