const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId.toString();
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};

exports.admin = (req, res, next) => { // Faut envoyer authorization : token + role:2 + id correspondant au token
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId.toString();
    const userRole = req.body.role
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId || userRole != 2) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: 'Unauthorized request'
    });
  }
};