import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, password, email, registrationdate, role, reputation, profileimageurl) 
       VALUES ($1, $2, $3, NOW(), 'user', 0, '') RETURNING *`,
      [username, hashedPassword, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error registering user');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user) {
      if (password === user.password) {
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET);
        return res.json({ token });
      }
    }
    res.status(401).send('Invalid credentials');
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Error logging in');
  }
});

export default router;
