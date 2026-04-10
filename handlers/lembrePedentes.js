
const { procurarPedentes } = require('../services/pendentesServices');
const { buscarContato } = require('../services/buscarContatoServices');

async function lembrePedentes(pool, client) {
    const lojas = [1, 2, 3, 4]; // IDs das lojas a serem verificadas

    for (const lojaId of lojas) {
        const pendentes = await procurarPedentes(pool, lojaId);
        if (pendentes.length > 0) {
            const contato = await buscarContato(pool, lojaId);
            const numero = contato.numero +'@c.us';
            await client.sendMessage(numero, `Lembrete: Você tem ${pendentes.length} pendente(s) na loja ${lojaId}. Por favor, verifique o sistema para mais detalhes.`);
        }

}}

module.exports = { lembrePedentes };