import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-base-200 text-base-content p-4 fixed top-0 left-0 right-0 z-10 shadow-md transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold hover:text-primary transition-colors duration-300">Gielinor Improvement Project</div>
        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/' ? 'font-bold' : ''}`}
          >
            Home
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'hover:w-full'}`}></span>
          </Link>
          <Link
            to="/tickets"
            className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/tickets' ? 'font-bold' : ''}`}
          >
            Tickets
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/tickets' ? 'w-full' : 'hover:w-full'}`}></span>
          </Link>
          <Link
            to="/about"
            className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/about' ? 'font-bold' : ''}`}
          >
            About
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'hover:w-full'}`}></span>
          </Link>
          <Link
            to="/support"
            className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/support' ? 'font-bold' : ''}`}
          >
            Support
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/support' ? 'w-full' : 'hover:w-full'}`}></span>
          </Link>
          {isAuthenticated ? (
            <Link 
              to="/login" 
              onClick={handleLogout}
              className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/logout' ? 'font-bold' : ''}`}
            >
              Logout
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/logout' ? 'w-full' : 'hover:w-full'}`}></span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className={`text-base-content relative transition-colors duration-300 ${location.pathname === '/login' ? 'font-bold' : ''}`}
            >
              Login
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/login' ? 'w-full' : 'hover:w-full'}`}></span>
            </Link>
          )}
          <label className="swap swap-rotate ml-4" style={{ width: '30px', height: '30px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

            {/* Sun icon */}
            <svg
              className={`swap-off fill-current w-8 h-8 ${theme === 'light' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon */}
            <svg
              className={`swap-on fill-current w-8 h-8 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </nav>
      </div>
    </header>
  );
}

export default Navbar; 