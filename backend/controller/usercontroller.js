const express = require('express');
const { verifyToken, hashPassword, comparePassword } = require('../middleware/auth');
const User = require('../model/usermodel');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('Email already exists');
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Email or password is incorrect');
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('password in incorrect')
    
    }
    const token = generateToken(user);
    return res.status(200).json({ user, token });
    } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
    }
    });
    
    router.get('/', verifyToken, async (req, res) => {
    try {
    const users = await User.findAll();
    return res.status(200).json(users);
    } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
    }
    });
    
    router.get('/:id', verifyToken, async (req, res) => {
    try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
    return res.status(404).send('User not found');
    }
    return res.status(200).json(user);
    } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
    }
    });
    
    router.put('/:id', verifyToken, async (req, res) => {
    try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
    return res.status(404).send('User not found');
    }
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    return res.status(200).json(user);
    } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
    }
    });
    
    router.delete('/:id', verifyToken, async (req, res) => {
    try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
    return res.status(404).send('User not found');
    }
    await user.destroy();
    return res.status(204).send();
    } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
    }
    });
    
    module.exports = router;