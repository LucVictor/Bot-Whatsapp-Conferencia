
async function confirmarVerificacao(pool, verification_id, local_id, verificante, saldo) {
    try {
        const result = await pool.query(
            `INSERT INTO "public" . "verification_status" (verification_id, local_id, verificante, timestamp, saldo)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [verification_id, local_id, verificante, new Date().toISOString(), saldo]
        );
        const updateResult = await pool.query(
            `UPDATE "public" . "verification" SET local_${local_id} = true WHERE id = $1 RETURNING *`,
            [verification_id]
        );
        verificarVerificacaoCompleta(verification_id);
        console.log('Verificação confirmada:', updateResult.rows[0]);
        return result.rows[0];
    }
    catch (err) {
        console.error('❌ Erro ao confirmar verificação:', err.message);
        return null;
    }
}