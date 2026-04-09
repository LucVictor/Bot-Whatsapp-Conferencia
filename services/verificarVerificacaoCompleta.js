async function verificarVerificacaoCompleta(pool, verification_id) {
    try {
        const result = await pool.query(
            `SELECT * FROM "public" . "verification" WHERE id = $1`,
            [verification_id]
        );
        console.log('Verificando se a verificação está completa:', result.rows[0]);
        if(result.rows[0].local_1 && result.rows[0].local_2 && result.rows[0].local_3 && result.rows[0].local_4) {
            const updateResult = await pool.query(
                `UPDATE "public" . "verification" SET status = 'completa' WHERE id = $1 RETURNING *`,
                [verification_id]
            );
            console.log('Verificação marcada como completa:', updateResult.rows[0]);
            return updateResult.rows[0];
        }
    } catch (err) {
        console.error('❌ Erro ao verificar verificação:', err.message);
        return null;
    }
}
