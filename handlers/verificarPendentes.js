const { listarVerificacoesPedentes } = require('../services/listarVerificacoesPedentesService');

async function verificarPendentesHandler(msg, pool1) {
  try {
    await msg.reply('Verificando o status da verificação');

    const pendentes = await listarVerificacoesPedentes(pool1);

    if (!pendentes || pendentes.length === 0) {
      await msg.reply('❌ Não existem verificações pendentes.');
      return;
    }

    for (const pendente of pendentes) {
      await msg.reply(
`📋 *#${pendente.id} | ${pendente.produto}*

📌 Status: *${pendente.status}*
📍 Origem: ${pendente.local_origem}

🧭 Matriz:${pendente.local_1 ? '✅' : '❌'} | Parnamirim:${pendente.local_2 ? '✅' : '❌'} | Zona Norte:${pendente.local_3 ? '✅' : '❌'} | Lagoa Nova:${pendente.local_4 ? '✅' : '❌'}`
      );
    }
  } catch (err) {
    console.error('❌ Erro ao verificar pendentes:', err.message);
    await msg.reply('❌ Ocorreu um erro ao buscar verificações pendentes.');
  }
}

