const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { protect } = require('../middleware/authMiddleware');

// All pricelist routes are protected
router.use(protect);

// Get all products
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id'
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const {
      article_no,
      product_service,
      in_price,
      price,
      unit,
      in_stock,
      description
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products 
       (article_no, product_service, in_price, price, unit, in_stock, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [article_no, product_service, in_price, price, unit, in_stock, description]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update product (full update)
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      article_no,
      product_service,
      in_price,
      price,
      unit,
      in_stock,
      description
    } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET article_no = $1, 
           product_service = $2, 
           in_price = $3, 
           price = $4, 
           unit = $5, 
           in_stock = $6, 
           description = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [article_no, product_service, in_price, price, unit, in_stock, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Partial update product (only update provided fields)
router.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = [];
    const values = [];
    let paramCount = 1;

    const allowedFields = [
      'article_no',
      'product_service',
      'in_price',
      'price',
      'unit',
      'in_stock',
      'description'
    ];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        fields.push(`${field} = $${paramCount}`);
        values.push(updates[field]);
        paramCount++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE products 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error partially updating product:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Bulk update products
router.put('/products', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Products array is required'
      });
    }

    const updatedProducts = [];
    const errors = [];

    for (const product of products) {
      try {
        const result = await pool.query(
          `UPDATE products 
           SET article_no = $1, 
               product_service = $2, 
               in_price = $3, 
               price = $4, 
               unit = $5, 
               in_stock = $6, 
               description = $7,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $8
           RETURNING *`,
          [
            product.article_no,
            product.product_service,
            product.in_price,
            product.price,
            product.unit,
            product.in_stock,
            product.description,
            product.id
          ]
        );

        if (result.rows.length > 0) {
          updatedProducts.push(result.rows[0]);
        } else {
          errors.push({ id: product.id, error: 'Product not found' });
        }
      } catch (error) {
        errors.push({ id: product.id, error: error.message });
      }
    }

    res.json({
      success: true,
      updated: updatedProducts.length,
      data: updatedProducts,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error bulk updating products:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;