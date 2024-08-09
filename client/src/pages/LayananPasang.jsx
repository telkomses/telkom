import React from 'react';
import './LayananPasang.css';
import UserNavbar from '../pages/UserNavbar'; // Import UserNavbar

const LayananPasangBaru = () => {
  const portfolioItems = [
    { title: 'Instalasi Fiber Optik', description: 'Pemasangan kabel fiber optik untuk rumah dan bisnis.', image: '/assets/layanan1.jpg' },
    { title: 'Instalasi Jaringan Wireless', description: 'Pemasangan jaringan wireless untuk area terpencil.', image: '/assets/layanan2.jpg' },
    { title: 'Instalasi Jaringan VoIP', description: 'Pemasangan jaringan VoIP untuk komunikasi bisnis.', image: '/assets/layanan3.jpg' },
    { title: 'Instalasi Jaringan Data Center', description: 'Pemasangan jaringan untuk pusat data modern.', image: '/assets/layanan1.jpg' }
  ];

  return (
    <div className="layanan-pasang-baru">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Layanan Pasang Baru Telkom Akses</h1>
          <p>Koneksi Terbaik untuk Masa Depan Digital Anda</p>
        </div>
      </header>
      <main className="main-content">
        <section className="description-section">
          <h2>Apa itu Layanan Pasang Baru?</h2>
          <p>Pekerjaan instalasi dan aktivasi layanan IndiHome bagi pelanggan baru, pelanggan dengan segmentasi retail atau residential dan Corporate. Jenis pekerjaan yang dilakukan berupa instalasi jaringan baru fiber optik (FO), pemasangan Access Point (AP), serta perangkat Internet of Things (IoT) yang lainnya, juga melayani upgrade layanan untuk pelanggan eksisting.</p>
        </section>
        <section className="portfolio-section">
          <h2>Portofolio Layanan Pasang Baru Kami</h2>
          <div className="portfolio-cards">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-card">
                <img src={item.image} alt={item.title} className="portfolio-image" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
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

export default LayananPasangBaru;
