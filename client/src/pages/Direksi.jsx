// Direksi.js
import React from 'react';
import './Direksi.css';
import UserNavbar from './UserNavbar'; // Import UserNavbar

const Direksi = () => {
  const direksi = [
    { name: 'AMBARI', position: 'Direktur Operation', image: '/assets/direksi1.jpg' },
    { name: 'STANISLAUS SUSATYO', position: 'Direktur Utama', image: '/assets/direksi2.jpg' },
    { name: 'NIZAR', position: 'Direktur HC & Information Technology', image: '/assets/direksi3.jpg' },
    { name: 'HERY SOFIAJI', position: 'Direktur Keuangan & Manajemen Risiko', image: '/assets/direksi4.jpg' },
    { name: 'SINUNG WIBOWO', position: 'Direktur Construction', image: '/assets/direksi5.jpg' },
    { name: 'DJOKO SRIE HANDONO', position: 'Direktur Business & Strategy', image: '/assets/direksi6.jpg' }
  ];

  return (
    <div className="direksi">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Direksi Telkom Akses</h1>
          <p>Kepemimpinan yang Berpengalaman untuk Inovasi Telekomunikasi</p>
        </div>
      </header>
      <main className="main-content">
        <section className="direksi-section">
          <h2>Anggota Direksi</h2>
          <div className="direksi-cards">
            {direksi.map((direksi, index) => (
              <div key={index} className="direksi-card">
                <img src={direksi.image} alt={direksi.name} className="direksi-image" />
                <h3>{direksi.name}</h3>
                <p>{direksi.position}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Telkom Akses. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Direksi;
