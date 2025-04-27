import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function Ticket({ ticketId }) {
  const [ticket, setTicket] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isScreenshotsOpen, setIsScreenshotsOpen] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/tickets/${ticketId}`);
        setTicket(response.data);

        const votesResponse = await axios.get(`/votes/${ticketId}`);
        const votes = votesResponse.data;
        const upvoteCount = votes.filter(vote => vote.votevalue === 1).length;
        const downvoteCount = votes.filter(vote => vote.votevalue === -1).length;
        setUpvotes(upvoteCount);
        setDownvotes(downvoteCount);

        const commentsResponse = await axios.get(`/comments/${ticketId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (!ticket) {
    return <div className="flex justify-center items-center h-full">Ticket not found</div>;
  }

  const handleVote = async (votevalue) => {
    try {
      await axios.post('/votes', {
        ticketId,
        userid: 1,  // Replace this with your authenticated user's ID
        votevalue,
      });

      if (votevalue === 1) setUpvotes(upvotes + 1);
      if (votevalue === -1) setDownvotes(downvotes + 1);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h3 className="card-title">{ticket.title}</h3>
        <p className="text-sm text-base-content">
          By {ticket.author} on {new Date(ticket.creationdate).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="badge badge-secondary">{ticket.category}</span>
          <span className={`badge ${ticket.status === 'Unaddressed' ? 'badge-info' : 'badge-success'}`}>
            {ticket.status}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4 items-center">
            <button onClick={() => handleVote(1)} className="btn btn-sm btn-outline">
              <FaThumbsUp /> {upvotes}
            </button>
            <button onClick={() => handleVote(-1)} className="btn btn-sm btn-outline">
              <FaThumbsDown /> {downvotes}
            </button>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>View Details</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{ticket.title}</h3>
            <p className="py-4">{ticket.description}</p>
            
            {ticket.jagexResponse && (
              <div className="mt-4">
                <h4 className="font-bold">Jagex Response:</h4>
                <p>{ticket.jagexResponse}</p>
              </div>
            )}
            
            {ticket.screenshotUrls && (
              <div className="mt-4">
                <h4 className="font-bold">Screenshots:</h4>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setIsScreenshotsOpen(!isScreenshotsOpen)}
                >
                  {isScreenshotsOpen ? 'Hide Screenshots' : 'Show Screenshots'}
                </button>
                {isScreenshotsOpen && (
                  <ul className="mt-2">
                    {JSON.parse(ticket.screenshotUrls).map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            
            {ticket.videoUrls && (
              <div className="mt-4">
                <h4 className="font-bold">Videos:</h4>
                <ul>
                  {JSON.parse(ticket.videoUrls).map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {ticket.tags && (
              <div className="mt-4">
                <h4 className="font-bold">Tags:</h4>
                <p>{JSON.parse(ticket.tags).join(', ')}</p>
              </div>
            )}
            
            <div className="mt-4">
              <h3>Comments</h3>
              {comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment.id} className="bg-base-200 p-2 rounded-lg mb-2">
                    <p>{comment.content}</p>
                    <p className="text-sm text-base-content">By {comment.author} on {new Date(comment.creationdate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
            
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;
