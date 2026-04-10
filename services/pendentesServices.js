
 async function procurarPedentes(pool, local_id) {
    try {
    const result = await pool.query(`
            SELECT v.*
            FROM "public"."verification" WHERE v.local_${local_id} = false
`);
        return result.rows;
    }
    catch (err) {
        console.error('❌ Erro ao procurar pendentes:', err.message);
        return [];
    }
    
}

module.exports = procurarPedentes;