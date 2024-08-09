// Penghargaan.js
import React from 'react';
import './Penghargaan.css';
import UserNavbar from './UserNavbar'; // Adjust the path as needed

const Penghargaan = () => {
  const awards = [
    { year: 2023, title: 'TOP GRC Award 2023 level 4 Stars dan The Most Committed GRC Leaders 2023', image: '/assets/penghargaan1.png' },
    { year: 2023, title: 'Penghargaan SNI AWARD 2023 -  Kategori Organisasi Besar Jasa Peringkat Emas', image: '/assets/penghargaan2.png' },
    { year: 2019, title: 'Penghargaan SNI AWARD 2019 - Kategori Organisasi Besar Jasa Peringkat Perak', image: '/assets/penghargaan3.jpg' },
    { year: 2022, title: 'Rekor MURI 2022 sebagai donor darah secara berseri terbanyak oleh karyawan perusahaan (10.000 kantong darah)', image: '/assets/penghargaan4.jpg' },
    { year: 2022, title: 'Top Digital Implementation 2022 – Level Star 5 dan Top Leader on Digital Implementation', image: '/assets/penghargaan5.jpg' }
  ];

  return (
    <div className="penghargaan">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Penghargaan Telkom Akses</h1>
          <p>Dedikasi dan Keunggulan dalam Telekomunikasi</p>
        </div>
      </header>
      <main className="main-content">
        <section className="penghargaan-section">
          <h2>Penghargaan Kami</h2>
          <div className="awards-cards">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <img src={award.image} alt={award.title} className="award-image" />
                <h3>{award.year}</h3>
                <h4>{award.title}</h4>
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

export default Penghargaan;
