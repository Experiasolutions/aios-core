# GUIA DE DEPLOY RÁPIDO DO BOT NO RENDER.COM (GRÁTIS)

O Render.com precisa que o código esteja no **GitHub**. Como o seu plano é vender hoje, esta é a rota mais rápida:

## PASSO 1: Preparar o código no GitHub
Como o seu projeto KAIROS é muito grande, a melhor estratégia é criar um repositório NOVO e PEQUENO só para hospedar esse bot (para o deploy ser rápido e não expor o KAIROS inteiro).

Abra o terminal e rode estes comandos (isso cria um projetinho só pro bot):
```bash
cd ~
mkdir petshop-demo
cd petshop-demo
npm init -y
npm install node-telegram-bot-api express dotenv
```

Copie o arquivo do bot para essa pasta nova:
```bash
cp "C:\Users\Gabriel\Documents\My KAIROS\scripts\demo-bots\demo-bot-petshop.js" index.js
```

Crie um novo repositório **privado** no seu GitHub e suba os arquivos:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/petshop-demo.git
git push -u origin main
```

## PASSO 2: Deploy no Render.com
1. Acesse [render.com](https://render.com) e crie/faça login.
2. No painel, clique em **"New +"** e selecione **"Web Service"**.
3. Escolha **"Build and deploy from a Git repository"**.
4. Conecte seu GitHub e selecione o repositório `petshop-demo`.

## PASSO 3: Configurar o Serviço no Render
Preencha a tela do Render exatamente assim:
- **Name:** petshop-bot
- **Region:** US East (Ohio) ou a que preferir.
- **Branch:** main
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Instance Type:** Free (Grátis)

## PASSO 4: As Variáveis de Ambiente (CRÍTICO)
Desça até a seção **"Environment Variables"** e clique em "Add Environment Variable":

- **Key:** `TELEGRAM_BOT_TOKEN`
- **Value:** `8636246952:AAGyOD2yhGQIpfwoQdWZ2RErdlD_PGpTdow` (o token que achamos no seu .env)

Clique em **"Create Web Service"** no final da página.

---

### O Segredo do "Plano Grátis" (Evitar que o bot durma)

O Render.com desliga os serviços grátis após 15 minutos sem uso. Para o bot não parar de responder os clientes, você precisa "cutucar" ele.

1. Quando o deploy do Render terminar, ele vai te dar uma URL (ex: `https://petshop-bot-xyz.onrender.com`).
2. Acesse [UptimeRobot.com](https://uptimerobot.com/) (é grátis).
3. Crie um monitor **HTTP(s)** e coloque a URL do seu Render.
4. Defina o intervalo para **cada 5 minutos**.

Pronto! O UptimeRobot vai ficar acessando seu bot a cada 5 minutos, e o Render nunca vai desligar a máquina. Bot 24/7 de graça com zero custo.
