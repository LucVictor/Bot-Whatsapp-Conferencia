async function buscarContato(pool, telefone) {
    console.log('Buscando contato para telefone:', telefone);
    try {
        const result = await pool.query(
            `SELECT * FROM "public" . "contacts" WHERE telefone = $1`,
            [telefone]
        );
        return result.rows[0];
    } catch (err) {
        console.error('❌ Erro ao buscar contato:', err.message);
        return null;
    }
}

module.exports = { buscarContato };