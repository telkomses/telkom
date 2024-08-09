import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserNavbar.css';
import logo from '../assets/telkomsel-logo.png'; // Adjust the path according to your project structure
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Import the modal component

const UserNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tentangKamiOpen, setTentangKamiOpen] = useState(false);
  const [portofolioOpen, setPortofolioOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    if (userId) {
      // Replace the URL with your server's URL
      const url = `http://localhost:3001/user/${userId}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUserName(data.full_name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleLogoutClick = () => {
    setModalOpen(true); // Open the confirmation modal
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setModalOpen(false); // Close the modal without logging out
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleTentangKami = () => {
    setTentangKamiOpen(!tentangKamiOpen);
  };

  const togglePortofolio = () => {
    setPortofolioOpen(!portofolioOpen);
  };

  return (
    <header className="navbar">
      <img 
        src={logo} 
        alt="Telkomsel Logo" 
        className="navbar-logo" 
        onClick={() => navigate('/user')}
      />
      <nav className="navbar-menu">
        <a href="/submission-history">Riwayat Pengajuan</a>
        <a href="/submit">Pengajuan Proyek</a>
        <div className="navbar-dropdown-menu">
          <button onClick={toggleTentangKami} className="navbar-menu-button">
            Tentang Kami
          </button>
          {tentangKamiOpen && (
            <div className="navbar-dropdown">
              <a href="/sekilas-perusahaan">Sekilas Perusahaan</a>
              <a href="/dewan-komisaris">Dewan Komisaris</a>
              <a href="/direksi">Direksi</a>
              <a href="/penghargaan-sertifikasi">Penghargaan dan Sertifikasi</a>
            </div>
          )}
        </div>
        <div className="navbar-dropdown-menu">
          <button onClick={togglePortofolio} className="navbar-menu-button">
            Portofolio
          </button>
          {portofolioOpen && (
            <div className="navbar-dropdown">
              <a href="/pembangunan-jaringan">Pembangunan Jaringan</a>
              <a href="/layanan-pasang-baru">Layanan Pasang Baru</a>
            </div>
          )}
        </div>
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
              <p>{userName}</p> {/* Display user name */}
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
      </nav>
      <LogoutConfirmationModal
        isOpen={modalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </header>
  );
}

export default UserNavbar;
