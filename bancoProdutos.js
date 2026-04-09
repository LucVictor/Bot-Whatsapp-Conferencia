require('dotenv').config();
const { Pool } = require('pg');

const pool2 = new Pool({
  host: process.env.DB_HOST2,
  port: Number(process.env.DB_PORT2),
  user: process.env.DB_USER2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME2,
});

module.exports = pool2;


async function testarConexao() {
  try {
    const result = await pool2.query('SELECT NOW()');
    console.log('✅ Conectado ao PostgreSQL');
    console.log('Hora do banco:', result.rows[0]);
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
  }
}

testarConexao();