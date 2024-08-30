import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data
      navigate('/game');  // Redirect to the game or appropriate page
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;
