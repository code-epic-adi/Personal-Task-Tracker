import React, { useState } from 'react';
import { createUser, authenticateUser, saveCurrentUser } from '../utils/localStorage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    if (isRegistering) {
      const result = createUser(username.trim(), password);
      if (result.success) {
        setSuccess('Account created successfully! You can now login.');
        setIsRegistering(false);
        setUsername('');
        setPassword('');
      } else {
        setError(result.message);
      }
    } else {
      const result = authenticateUser(username.trim(), password);
      if (result.success) {
        saveCurrentUser(username.trim());
        onLogin(username.trim());
      } else {
        setError(result.message);
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Personal Task Tracker</h2>
          <p>{isRegistering ? 'Create your account' : 'Welcome back! Please sign in'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="login-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-input"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <button type="submit" className="login-btn">
            {isRegistering ? 'Create Account' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <button 
            type="button" 
            className="toggle-mode-btn"
            onClick={toggleMode}
          >
            {isRegistering 
              ? 'Already have an account? Login' 
              : "Don't have an account? Register"
            }
          </button>
        </div>
        
        <div className="demo-note">
          <p><strong>Note:</strong> This is a demo application. Your data will be saved locally.</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 