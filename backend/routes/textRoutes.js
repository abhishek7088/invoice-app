const express = require('express');
const router = express.Router();
const pool = require('../config/database');


router.get('/:page/:language', async (req, res) => {
  try {
    const { page, language } = req.params;
    
    const result = await pool.query(
      'SELECT key, value FROM texts WHERE page = $1 AND language = $2',
      [page, language]
    );
    
  
    const texts = {};
    result.rows.forEach(row => {
      texts[row.key] = row.value;
    });
    
    res.json({
      success: true,
      data: texts
    });
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM texts ORDER BY page, language');
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching all texts:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;