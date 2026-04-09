const { Client, LocalAuth } = require('whatsapp-web.js');
const criarVerificacaoHandler = require('./handlers/criarVerificacao');
const verificarPendentesHandler = require('./handlers/verificarPendentes');
const confirmarVerificacaoHandler = require('./handlers/confirmarVerificacao');
const pool1 = require('./banco');
const pool2 = require('./bancoProdutos');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'bot-lucas',
    dataPath: './sessions'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('Escaneie o QR Code:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('✅ Cliente iniciado!');
});

client.on('message', async (msg) => {
  try {
    if (!msg.body) return;

    const texto = msg.body.trim();

    const criarVerificacao = texto.match(/^!solicitar código (\d+)$/i);
    const verificarPendentes = texto.match(/^!verificar pendentes$/i);
    const confirmarVerificacao = texto.match(/^!confirmar\s+(\d+)\s+([+-]\d+)$/i);

    if (verificarPendentes) {
      await verificarPendentesHandler(msg, pool1);
      return;
    }

    if (criarVerificacao) {
      await criarVerificacaoHandler(msg, criarVerificacao, pool1, pool2);
      return;
    }

    if (confirmarVerificacao) {
      await confirmarVerificacaoHandler(msg, confirmarVerificacao, pool1);
      return;
    }
  } catch (err) {
    console.error('Erro geral:', err);
  }
});

client.initialize();