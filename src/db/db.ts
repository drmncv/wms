import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const db = {
  query: async function query(sql: string) {
    let conn;
    try {
      conn = await pool.getConnection();

      const res = await conn.query(sql);
      return res;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  },
};

export default db;
