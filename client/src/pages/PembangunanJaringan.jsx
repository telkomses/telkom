import React from 'react';
import './PembangunanJaringan.css';
import UserNavbar from '../pages/UserNavbar'; // Import UserNavbar

const PembangunanJaringan = () => {
  const projects = [
    { title: 'Proyek Pembangunan Fiber Optik', description: 'Pengembangan jaringan fiber optik di seluruh Indonesia untuk meningkatkan konektivitas.', image: '/assets/solusi1.jpg' },
    { title: 'Proyek Pembangunan BTS', description: 'Penambahan Base Transceiver Station untuk memperluas jangkauan sinyal telekomunikasi.', image: '/assets/solusi2.jpg' },
    { title: 'Proyek Pembangunan Data Center', description: 'Pembangunan pusat data untuk mendukung kebutuhan layanan digital.', image: '/assets/solusi3.jpg' },
    { title: 'Proyek Pembangunan Infrastruktur 5G', description: 'Pengembangan infrastruktur untuk mendukung teknologi 5G di Indonesia.', image: '/assets/solusi4.jpg' }
  ];

  return (
    <div className="pembangunan-jaringan">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Pembangunan Jaringan Telkom Akses</h1>
          <p>Mewujudkan Konektivitas yang Lebih Baik</p>
        </div>
      </header>
      <main className="main-content">
        <section className="projects-section">
          <h2>Portofolio Pembangunan Jaringan Kami</h2>
          <div className="projects-cards">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
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

export default PembangunanJaringan;
