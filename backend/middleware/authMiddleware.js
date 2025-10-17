console.log("JWT Secret (middleware):", process.env.JWT_SECRET);

const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  console.log("Authorization header:", req.headers.authorization); // 👈 debug

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log("Token extracted:", token); // 👈 debug

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token payload:", decoded); // 👈 debug

      req.user = {
        id: decoded.id,
        email: decoded.email
      };

      return next();

    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }
};

module.exports = { protect };
