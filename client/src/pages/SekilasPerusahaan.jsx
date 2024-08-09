import React, { useEffect, useState, useMemo } from 'react';
import './SekilasPerusahaan.css';
import UserNavbar from './UserNavbar'; // Adjust the path as needed

const SekilasPerusahaan = () => {
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    mission: false,
    values: false,
    history: false,
    widgets: false
  });

  const sectionRefs = useMemo(() => ({
    about: React.createRef(),
    mission: React.createRef(),
    values: React.createRef(),
    history: React.createRef(),
    widgets: React.createRef()
  }), []);

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  return (
    <div className="sekilas-perusahaan">
      <UserNavbar /> {/* Include the UserNavbar component */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Selamat Datang di Telkom Akses</h1>
          <p>Inovasi Terkemuka dalam Telekomunikasi</p>
        </div>
      </header>
      <main className="main-content">
        <section id="about" className={`about-section ${visibleSections.about ? 'section-visible' : ''}`} ref={sectionRefs.about}>
          <h2>Tentang Kami</h2>
          <p>Telkom Akses adalah perusahaan telekomunikasi terkemuka yang berkomitmen untuk memberikan solusi dan layanan terbaik. Kami bertekad untuk mendorong inovasi dan keunggulan dalam setiap aspek bisnis kami.</p>
        </section>
        <section id="mission" className={`mission-section ${visibleSections.mission ? 'section-visible' : ''}`} ref={sectionRefs.mission}>
          <h2>Misi Kami</h2>
          <p>Misi kami adalah menghubungkan orang, bisnis, dan komunitas melalui layanan telekomunikasi superior. Kami berusaha melampaui ekspektasi dan memberikan nilai luar biasa kepada para pemangku kepentingan kami.</p>
        </section>
        <section id="values" className={`values-section ${visibleSections.values ? 'section-visible' : ''}`} ref={sectionRefs.values}>
          <h2>Nilai-Nilai Kami</h2>
          <div className="values-cards">
            <div className="value-card">
              <h3>Inovasi</h3>
              <p>Mendorong kemajuan teknologi dalam telekomunikasi.</p>
            </div>
            <div className="value-card">
              <h3>Keunggulan</h3>
              <p>Menyediakan layanan dan solusi terbaik.</p>
            </div>
            <div className="value-card">
              <h3>Integritas</h3>
              <p>Menjaga standar etika tertinggi dalam semua operasi kami.</p>
            </div>
          </div>
        </section>
        <section id="history" className={`history-section ${visibleSections.history ? 'section-visible' : ''}`} ref={sectionRefs.history}>
          <h2>Sejarah Telkom Akses</h2>
          <p>
            Telkom Akses didirikan pada tahun 2000 sebagai bagian dari PT Telekomunikasi Indonesia Tbk (Telkom). 
            Sejak awal berdirinya, Telkom Akses telah berkomitmen untuk menyediakan infrastruktur telekomunikasi yang handal dan inovatif di seluruh Indonesia. 
            Perusahaan ini mengawali perjalanan dengan fokus pada pengembangan dan penyediaan solusi akses internet berbasis fiber optik, dan dalam waktu singkat, telah menjadi salah satu penyedia utama infrastruktur telekomunikasi di negara ini. 
            Dengan berbagai proyek besar dan kemitraan strategis, Telkom Akses telah memperluas cakupan layanannya ke berbagai daerah, termasuk wilayah-wilayah terpencil, untuk memastikan bahwa semua lapisan masyarakat dapat mengakses layanan telekomunikasi berkualitas tinggi. 
            Dalam upayanya untuk terus berinovasi, Telkom Akses telah memperkenalkan berbagai teknologi baru, seperti jaringan 5G dan solusi Smart City, yang semakin memperkuat posisinya sebagai pelopor dalam industri telekomunikasi. 
            Keberhasilan Telkom Akses tidak lepas dari dedikasi timnya yang profesional dan berdedikasi, serta komitmen berkelanjutan untuk meningkatkan layanan dan teknologi demi memenuhi kebutuhan pelanggan. 
            Dengan visi untuk terus menjadi pemimpin dalam industri telekomunikasi, Telkom Akses terus melangkah maju, beradaptasi dengan perkembangan teknologi, dan berkontribusi pada pembangunan infrastruktur telekomunikasi yang lebih baik di seluruh Indonesia.
          </p>
        </section>
        <section id="widgets" className={`widgets-section ${visibleSections.widgets ? 'section-visible' : ''}`} ref={sectionRefs.widgets}>
          <h2>Fitur Unggulan</h2>
          <div className="widgets-container">
            <div className="widget">
              <h3>Jaringan 5G</h3>
              <p>Telkom Akses menghadirkan jaringan 5G untuk pengalaman internet yang lebih cepat dan lebih stabil.</p>
            </div>
            <div className="widget">
              <h3>Solusi Smart City</h3>
              <p>Mengelola dan mengoptimalkan berbagai aspek kehidupan kota dengan teknologi canggih.</p>
            </div>
            <div className="widget">
              <h3>Keamanan Data</h3>
              <p>Menjamin perlindungan data dan privasi pelanggan dengan solusi keamanan terkini.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Telkom Akses. Semua hak dilindungi undang-undang.</p>
      </footer>
    </div>
  );
};

export default SekilasPerusahaan;
