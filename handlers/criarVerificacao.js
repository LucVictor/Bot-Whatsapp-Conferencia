const { procurarProduto } = require('../services/procurarProdutoService');
const { salvarVerificacao } = require('../services/salvarVerificacaoService');
const { buscarContato } = require('../services/buscarContatoService');

async function criarVerificacaoHandler(msg, match, pool1, pool2) {
  try {
    const codigo = match[1];

    await msg.reply(`Código ${codigo} recebido com sucesso ✅`);

    const numero = msg.from.replace('@c.us', '');
    const contato = await buscarContato(pool1, numero);
    const produto = await procurarProduto(pool2, codigo);

    if (!contato) {
      await msg.reply('❌ Contato não encontrado.');
      return;
    }

    if (!produto) {
      await msg.reply('❌ Código não encontrado no banco.');
      return;
    }

    const novaVerificacao = {
      codigo: produto.code,
      produto: produto.name,
      status: 'pendente',
      solicitante: contato.nome,
      timestamp: new Date().toISOString(),
      localOrigem: contato.local_id,
    };

    const verificacaoSalva = await salvarVerificacao(pool1, novaVerificacao);

    if (verificacaoSalva) {
      await msg.reply(
        `✅ Verificação id ${verificacaoSalva.id} salva com sucesso para o produto ${produto.name}.`
      );
    } else {
      await msg.reply('❌ Não foi possível salvar a verificação.');
    }
  } catch (err) {
    console.error('❌ Erro ao criar verificação:', err.message);
    await msg.reply('❌ Ocorreu um erro ao criar a verificação.');
  }
}

module.exports = criarVerificacaoHandler;