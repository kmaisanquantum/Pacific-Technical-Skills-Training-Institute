import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';

// Fallback to local postgres defaults if DATABASE_URL is not set
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ptsti';

export const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

export async function initDb() {
  try {
    // Create tables if they do not exist
    const client = await pool.connect();
    console.log('Successfully connected to the database.');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) REFERENCES users(name) ON DELETE CASCADE,
        module_id INTEGER NOT NULL,
        score INTEGER NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(username, module_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) REFERENCES users(name) ON DELETE CASCADE,
        amount VARCHAR(50) NOT NULL,
        reference VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(username)
      );
    `);

    client.release();
    console.log('Database tables initialized successfully.');
  } catch (err) {
    console.error('Database connection or initialization failed. Falling back to in-memory mode for robustness:', err.message);
  }
}
