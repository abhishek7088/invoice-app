const { Pool } = require('pg');
require('dotenv').config();

// Parse connection string and add SSL
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Test connection with better error handling
pool.on('connect', () => {
  console.log('✅ Connected to NeonDB PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err.message);
  console.error('Stack:', err.stack);
});

// Test query on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database test query failed:', err.message);
  } else {
    console.log('✅ Database test query successful:', res.rows[0].now);
  }
});

module.exports = pool;