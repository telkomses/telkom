import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import logo from '../assets/telkomsel-logo.png';

function Login({ setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success('Registration successful! You can now log in.', {
        position: "top-right",
        autoClose: 3000, // close the toast after 3 seconds
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', { username, password });
      const { userId, role } = res.data;
      localStorage.setItem('userId', userId);
      setUserId(userId); // Simpan user ID dalam state global
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Login</h2>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon-outside" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon-outside" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <button type="button" className="register-button" onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
}

export default Login;