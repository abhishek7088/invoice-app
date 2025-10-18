const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/database');

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "https://invoice-app-frontend.onrender.com", 
    "http://localhost:5173" 
  ],
  credentials: true,
}));

app.use(express.json());


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});


const authRoutes = require('./routes/authRoutes');
const textRoutes = require('./routes/textRoutes');
const pricelistRoutes = require('./routes/pricelistRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/texts', textRoutes);
app.use('/api/pricelist', pricelistRoutes);


app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
});

console.log("JWT Secret:", process.env.JWT_SECRET);
