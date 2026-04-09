async function salvarVerificacao(pool, verificacao) {
    try {
        const result = await pool.query(
            `INSERT INTO "public" . "verification"
            (codigo, produto, status, solicitante, timestamp, local_origem)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                verificacao.codigo,
                verificacao.produto,
                verificacao.status,
                verificacao.solicitante,
                verificacao.timestamp,
                verificacao.local_origem,
            ]
        );

        return result.rows[0];
    } catch (err) {
        console.error('❌ Erro ao salvar verificação:', err.message);
        return null;
    }
}