import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Import the modal component

const AdminAppBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate('/admin');
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    setModalOpen(true); // Open the confirmation modal
  };

  const handleLogoutConfirm = () => {
  console.log("Logout confirmed");
  localStorage.removeItem('userId');
  window.location.href = '/'; // Force a full page reload to the login page
};

  const handleLogoutCancel = () => {
    setModalOpen(false); // Close the modal without logging out
  };

  const userName = "Admin";

  return (
    <header className="admin-appbar" onClick={handleClick}>
      <h1>Admin Dashboard</h1>
      <div className="navbar-profile">
        <button onClick={toggleDropdown} className="navbar-profile-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="navbar-profile-pic"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          {userName || 'Profil'}
        </button>
        {dropdownOpen && (
          <div className="navbar-dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="navbar-profile-pic"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <p className="dropdown-username">{userName}</p>
            <button onClick={handleLogoutClick} className="dropdown-logout-button">Logout</button>
          </div>
        )}
      </div>
      <LogoutConfirmationModal
        isOpen={modalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </header>
  );
};

export default AdminAppBar;
