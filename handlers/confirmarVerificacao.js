const { confirmarVerificacao } = require('../services/confirmarVerificacaoService');
const { buscarContato } = require('../services/buscarContatoService');

async function confirmarVerificacaoHandler(msg, match, pool1) {
  try {
    const id = match[1];
    const valor = Number(match[2]);
    const contact = await msg.getContact();

    const contato = await buscarContato(pool1, contact.number);
    console.log('Contato encontrado para confirmação:', contato);

    if (!contato) {
      await msg.reply('❌ Contato não encontrado.');
      return;
    }

    await confirmarVerificacao(
      pool1,
      id,
      contato.local_id,
      contato.nome,
      valor
    );

    await msg.reply(
      `✅ Verificação #${id} confirmada com saldo ${valor}. Obrigado, ${contato.nome}!`
    );
  } catch (err) {
    console.error('❌ Erro ao confirmar verificação:', err.message);
    await msg.reply(
      '❌ Ocorreu um erro ao confirmar a verificação. Verifique o formato do comando e tente novamente.'
    );
  }
}

module.exports = confirmarVerificacaoHandler;