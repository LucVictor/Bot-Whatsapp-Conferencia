async function listarVerificacoesPedentes(pool) {
    try {
        const result = await pool.query(`
            SELECT v.*
            FROM "public"."verification" v
            LEFT JOIN (
                SELECT verification_id, COUNT(DISTINCT local_id) AS total_confirmados
                FROM "public"."verification_status"
                GROUP BY verification_id
            ) vs ON vs.verification_id = v.id
            WHERE v.status = 'pendente'
               OR (
                    (
                        (CASE WHEN v.local_1 THEN 1 ELSE 0 END) +
                        (CASE WHEN v.local_2 THEN 1 ELSE 0 END) +
                        (CASE WHEN v.local_3 THEN 1 ELSE 0 END) +
                        (CASE WHEN v.local_4 THEN 1 ELSE 0 END)
                    ) > COALESCE(vs.total_confirmados, 0)
               )
            ORDER BY v.timestamp DESC
        `);

        return result.rows;
    } catch (err) {
        console.error('❌ Erro ao listar verificações:', err.message);
        return [];
    }
}

module.exports = { listarVerificacoesPedentes };