const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, created_at FROM users');
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;