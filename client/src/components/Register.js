import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faIdCard, faBuilding, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/telkomsel-logo.png';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [role] = useState('user');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vendors');
        setVendors(response.data);
      } catch (err) {
        console.error('Error fetching vendors:', err);
      }
    };

    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
        fullName,
        nik,
        vendor: selectedVendor,
        role,
      });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000, // close the toast after 3 seconds
      });
      setError(''); // Clear any previous error
      setShowModal(true); // Show the success modal
    } catch (err) {
      toast.error('Registration failed', {
        position: "top-right",
        autoClose: 3000, // close the toast after 3 seconds
      });
      setError('Registration failed');
    }
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error ? 'input-error' : ''}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faIdCard} className="input-icon" />
          <input type="text" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faBuilding} className="input-icon" />
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.vendor}>
                {vendor.vendor}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} className="input-icon" /> Back to Login
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-text">Register Berhasil</h2>
            <button onClick={handleModalOk} className="modal-ok-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
