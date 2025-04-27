import React from 'react';
import { Link } from 'react-router-dom';
import { FaReddit, FaTwitter, FaDiscord } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content p-4 fixed bottom-0 left-0 right-0 z-10 shadow-md transition-all duration-300">
      <div className="container mx-auto text-center">
        <p className="mb-2">© {new Date().getFullYear()} Gielinor Improvement Project</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/support" className="text-primary hover:text-secondary transition-colors duration-300">Support the Project!</Link>
          <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300">
            <FaReddit size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300">
            <FaDiscord size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 