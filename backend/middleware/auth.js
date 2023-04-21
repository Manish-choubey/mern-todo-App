const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/usermodel');

function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
