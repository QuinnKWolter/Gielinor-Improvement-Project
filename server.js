import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import ticketsRouter from './routes/tickets.js';
import commentsRouter from './routes/comments.js';
import votesRouter from './routes/votes.js';
import categoriesRouter from './routes/categories.js';
import pool from './config.js';

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/votes', votesRouter);
app.use('/api/categories', categoriesRouter);

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));