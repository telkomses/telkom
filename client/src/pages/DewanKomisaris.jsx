import React from 'react';
import './DewanKomisaris.css';
import UserNavbar from './UserNavbar'; // Import UserNavbar

const DewanKomisaris = () => {
  const komisaris = [
    { name: 'SEMLY SAALINO', position: 'Komisaris', image: '/assets/dk1.jpg' },
    { name: 'MOHAMMAD SALSABIL', position: 'Komisaris Utama', image: '/assets/dk2.jpg' },
    { name: 'SUHARYOTO', position: 'Komisaris', image: '/assets/dk3.jpg' },
    { name: 'HUSNI AMRIYANTO', position: 'Komisaris', image: '/assets/dk4.jpg' },
    { name: 'FAHD PAHDEPIE', position: 'Komisaris', image: '/assets/dk5.jpg' },
    { name: 'EDIE KURNIAWAN', position: 'Komisaris', image: '/assets/dk6.jpg' }
  ];

  return (
    <div className="dewan-komisaris">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Dewan Komisaris Telkom Akses</h1>
          <p>Komitmen Kami dalam Mewujudkan Inovasi Telekomunikasi</p>
        </div>
      </header>
      <main className="main-content">
        <section className="komisaris-section">
          <h2>Anggota Dewan Komisaris</h2>
          <div className="komisaris-cards">
            {komisaris.map((komisaris, index) => (
              <div key={index} className="komisaris-card">
                <img src={komisaris.image} alt={komisaris.name} className="komisaris-image" />
                <h3>{komisaris.name}</h3>
                <p>{komisaris.position}</p>
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

export default DewanKomisaris;
