const bcrypt = require('bcryptjs');
const pool = require('./config/database');

async function createTestUser() {
  try {
    const email = 'test@example.com';
    const password = 'password123';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Delete existing user if exists
    await pool.query('DELETE FROM users WHERE email = $1', [email]);

    // Create new user
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );

    console.log('✅ Test user created successfully:');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('   User ID:', result.rows[0].id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  }
}

createTestUser();