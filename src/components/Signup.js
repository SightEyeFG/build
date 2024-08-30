import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed, please try again.');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
