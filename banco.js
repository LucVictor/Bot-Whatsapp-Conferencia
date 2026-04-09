require('dotenv').config();
const { Pool } = require('pg');

const pool1 = new Pool({
  host: process.env.DB_HOST1,
  port: Number(process.env.DB_PORT1),
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1,
});

module.exports = pool1;


async function testarConexao() {
  try {
    const result = await pool1.query('SELECT NOW()');
    console.log('✅ Conectado ao PostgreSQL');
    console.log('Hora do banco:', result.rows[0]);
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
  }
}

testarConexao();