import express from 'express';
import pool from '../config.js';

const router = express.Router();

// Get All Comments for a Ticket
router.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        comments.*, 
        users.username AS author 
       FROM comments 
       JOIN users ON comments.authorId = users.id 
       WHERE comments.ticketId = $1 
       ORDER BY comments.creationDate ASC`,
      [ticketId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching comments');
  }
});

// Add a Comment to a Ticket
router.post('/', async (req, res) => {
  const { ticketId, authorId, content } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO comments (ticketId, authorId, content, creationDate) 
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [ticketId, authorId, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error adding comment');
  }
});

// Update a Comment (if needed)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const result = await pool.query(
      `UPDATE comments SET content = $1, modifiedDate = NOW() WHERE id = $2 RETURNING *`,
      [content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error updating comment');
  }
});

// Delete a Comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error deleting comment');
  }
});

export default router;
