import express from 'express';
import pool from '../config.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});

// Get All Tickets
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tickets');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).send('Error fetching tickets');
  }
});

// Get Ticket by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        tickets.*, 
        users.username AS author, 
        categories.categoryname AS category 
       FROM tickets 
       JOIN users ON tickets.authorid = users.id 
       JOIN categories ON tickets.categoryid = categories.id 
       WHERE tickets.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Ticket not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).send('Error fetching ticket');
  }
});

// Create New Ticket
router.post('/', upload.array('screenshots', 10), async (req, res) => {
  const { title, description, authorId, status, categoryId } = req.body;
  const files = req.files;

  console.log('Received new ticket data:', req.body);
  console.log('Received files:', files);

  try {
    const result = await pool.query(
      'INSERT INTO tickets (title, description, authorId, status, categoryId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, authorId, status, categoryId]
    );

    const ticket = result.rows[0];
    const screenshotUrls = files.map(file => `/uploads/${ticket.id}-${file.filename}`);

    // Update the ticket with the screenshot URLs
    await pool.query(
      'UPDATE tickets SET screenshotUrls = $1 WHERE id = $2',
      [screenshotUrls.join(','), ticket.id]
    );

    console.log('Ticket created successfully:', ticket);
    res.json(ticket);
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).send('Error creating ticket');
  }
});

export default router;
