import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering ? '/users/register' : '/users/login';
      const payload = isRegistering ? { username, password, email } : { username, password };
      const response = await axios.post(endpoint, payload);
      // Store the token and redirect
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Error: ' + err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] bg-gradient-to-r from-primary to-secondary">
      <div className="card w-full max-w-md shadow-lg bg-base-100">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
          <p className="text-center mb-8 text-lg">Access your account or create a new one to participate in the project.</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {isRegistering && (
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login; 