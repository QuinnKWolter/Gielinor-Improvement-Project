import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  const handleBrowseTickets = () => {
    navigate('/tickets');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white p-8 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Shape the Future of Gielinor!</h1>
        <p className="mb-8 text-lg animate-fadeIn delay-100">Contribute your ideas, report bugs, and track Jagex responses.</p>
        <div className="space-x-4">
          <button className="btn btn-secondary" onClick={handleBrowseTickets}>Browse Tickets</button>
        </div>
      </section>

      {/* Featured Tickets Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-4 animate-fadeIn">Featured Improvements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Example Ticket Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <h3 className="card-title">Ticket Title</h3>
              <p>Short description of the ticket...</p>
              <div className="flex justify-between items-center">
                <span className="badge badge-secondary">Category</span>
                <div className="flex space-x-2">
                  <FaThumbsUp className="hover:text-primary transition-colors duration-300" />
                  <FaThumbsDown className="hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
          {/* Add more ticket cards as needed */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="p-8 text-center bg-gradient-to-r from-secondary to-primary text-white">
        <h2 className="text-3xl font-bold mb-4 animate-fadeIn">Join the Gielinor Improvement Community</h2>
        <p className="mb-4 animate-fadeIn delay-100">Become a part of our community and help shape the future of Gielinor.</p>
        <button className="btn btn-primary" onClick={handleLogin}>Sign Up/Login</button>
      </section>
    </div>
  );
}

export default Home; 