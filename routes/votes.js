import express from 'express';
import pool from '../config.js';

const router = express.Router();

// Get All Votes for a Ticket
router.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM votes WHERE ticketId = $1',
      [ticketId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching votes');
  }
});

// Add or Update a Vote (1 for Upvote, -1 for Downvote)
router.post('/', async (req, res) => {
  const { ticketId, userId, voteValue } = req.body;
  try {
    // Check if the user has already voted on this ticket
    const existingVote = await pool.query(
      'SELECT * FROM votes WHERE ticketId = $1 AND userId = $2',
      [ticketId, userId]
    );

    if (existingVote.rows.length > 0) {
      // Update the existing vote
      const result = await pool.query(
        `UPDATE votes SET voteValue = $1 WHERE ticketId = $2 AND userId = $3 RETURNING *`,
        [voteValue, ticketId, userId]
      );
      res.json(result.rows[0]);
    } else {
      // Add a new vote
      const result = await pool.query(
        `INSERT INTO votes (ticketId, userId, voteValue) 
         VALUES ($1, $2, $3) RETURNING *`,
        [ticketId, userId, voteValue]
      );
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error adding or updating vote');
  }
});

// Delete a Vote (Remove user's vote from a ticket)
router.delete('/', async (req, res) => {
  const { ticketId, userId } = req.body;
  try {
    await pool.query('DELETE FROM votes WHERE ticketId = $1 AND userId = $2', [ticketId, userId]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error deleting vote');
  }
});

export default router;
