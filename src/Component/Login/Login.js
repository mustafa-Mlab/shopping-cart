import React, { useState } from 'react';
import './Login.scss';

function Login({ onLogin, navigate }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (activeTab === 'signin') {
      if (!email.trim() || !password.trim()) {
        setError('Please fill in all fields.');
        return;
      }

      // Check for user login. Default demo: demo@example.com / password
      const userList = JSON.parse(localStorage.getItem('userList') || '[]');
      let user = userList.find((u) => u.email === email && u.password === password);

      // Fallback to default demo user
      if (email === 'demo@example.com' && password === 'password') {
        user = { name: 'Mustafa Kamal', email: 'demo@example.com' };
      }

      if (user) {
        onLogin(user);
        navigate('account');
      } else {
        setError('Invalid email or password. Use demo@example.com / password.');
      }
    } else {
      // Create Account
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields.');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      const userList = JSON.parse(localStorage.getItem('userList') || '[]');
      if (userList.some((u) => u.email === email) || email === 'demo@example.com') {
        setError('An account with this email already exists.');
        return;
      }

      // Add user to local list
      const newUser = { name, email, password };
      userList.push(newUser);
      localStorage.setItem('userList', JSON.stringify(userList));

      setSuccess('Account created successfully! Switching to Sign In...');
      setName('');
      setPassword('');
      
      // Auto switch tab to signin after 1.5s
      setTimeout(() => {
        setActiveTab('signin');
        setError('');
        setSuccess('');
      }, 1500);
    }
  };

  return (
    <div className="login-page container">
      <div className="login-card glass-effect">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signin'); setError(''); setSuccess(''); }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
          >
            Register
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="e.g. demo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert-message error">{error}</div>}
          {success && <div className="alert-message success">{success}</div>}

          <button type="submit" className="btn-submit btn-primary">
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {activeTab === 'signin' && (
            <div className="demo-credentials">
              <h5>Demo Credentials:</h5>
              <p>Email: <span>demo@example.com</span></p>
              <p>Password: <span>password</span></p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
