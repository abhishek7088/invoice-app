const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});


pool.on('connect', () => {
  console.log(' Connected to NeonDB PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err.message);
  console.error('Stack:', err.stack);
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' Database test query failed:', err.message);
  } else {
    console.log(' Database test query successful:', res.rows[0].now);
  }
});

module.exports = pool;