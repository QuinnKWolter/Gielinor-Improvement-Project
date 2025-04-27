import express from 'express';
import pool from '../config.js';

const router = express.Router();

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching categories');
  }
});

export default router;
