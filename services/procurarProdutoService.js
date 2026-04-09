async function procurarProduto(pool, codigo) {
    try {
        const result = await pool.query(
            'SELECT * FROM "public" . "product" WHERE code = $1',
            [codigo]
        );

        if (result.rows.length > 0) {
            console.log('✅ Produto encontrado:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('❌ Código não encontrado');
            return null;
        }
    } catch (err) {
        console.error('❌ Erro ao buscar produto:', err.message);
        return null;
    }
}