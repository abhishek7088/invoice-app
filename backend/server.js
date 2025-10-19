const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/database');

dotenv.config();

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5000',
];


if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}


if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(/\.onrender\.com$/);
}

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(' CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

console.log('🌍 Environment:', process.env.NODE_ENV);
console.log('🔌 Database:', process.env.DATABASE_URL ? 'Connected' : 'Not configured');
console.log('🔑 JWT Secret:', process.env.JWT_SECRET ? 'Configured' : 'Missing');


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log(' Database connected at:', res.rows[0].now);
  }
});


app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    cors: 'enabled'
  });
});


app.get('/', (req, res) => {
  res.json({
    message: '123 Fakturera API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      login: '/api/auth/login',
      products: '/api/pricelist/products',
      texts: '/api/texts/:page/:language'
    }
  });
});

const authRoutes = require('./routes/authRoutes');
const textRoutes = require('./routes/textRoutes');
const pricelistRoutes = require('./routes/pricelistRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/texts', textRoutes);
app.use('/api/pricelist', pricelistRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API available at /api`);
});