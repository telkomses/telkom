import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './UserPage.css';
import UserNavbar from './UserNavbar'; // Import UserNavbar

const UserDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const rect = articleRef.current.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        setIsVisible(rect.top <= viewHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <UserNavbar /> {/* Gunakan UserNavbar di sini */}

      <main className="main-content">
        <div className="banner">
          <h1>Welcome to Telkomsel</h1>
          <p>Explore our latest offers and services</p>
        </div>

        <div className="widgets-container">
          {/* Slideshow */}
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <div>
              <img src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/613/2024/04/28/Hero_230626_b91ff00b6f-160233241.jpg" alt="Telkomsel Lite" />
              <p className="legend">Dibawa rileks aja dengan Telkomsel Lite</p>
            </div>
            <div>
              <img src="https://www.telkomsel.com/sites/default/files/product_banner_image/halo-new-kv_0.png" alt="Halo Services" />
              <p className="legend">Katakan Halo pada layanan serba mudah</p>
            </div>
            <div>
              <img src="https://www.telkomsel.com/sites/default/files/product_banner_image/byU-new-KV_0.png" alt="by.U" />
              <p className="legend">Bebas Internetan Semuanya Semaunya</p>
            </div>
            <div>
              <img src="https://www.telkomsel.com/sites/default/files/product_banner_image/KV-tahilalats-telkomsel--nongkrong-bareng_0.png" alt="Tahilalats" />
              <p className="legend">Nongkrong bareng Tahilalats</p>
            </div>
          </Carousel>

          {/* Article Section */}
          <div className={`article-container ${isVisible ? 'visible' : ''}`} ref={articleRef}>
            <h2>Telkom Akses: Overview</h2>
            <p>
              Telkom Akses merupakan anak perusahaan PT Telkom Indonesia Tbk.
              Kami merupakan anak perusahaan PT Telkom Indonesia Tbk dan berdiri
              sejak tanggal 12 Desember 2012. Kami memiliki expertise secara end
              to end dalam value chain mulai tahap perencanaan, pembangunan hingga
              operasi dan pemeliharaan. Coverage area kami menjangkau operasi secara
              nasional dalam mendukung percepatan penetrasi jaringan broadband di
              Indonesia. Telkom Akses memiliki portfolio yaitu:
            </p>
            <ul>
              <li>Survey, Drawing dan Data Inventory</li>
              <li>Pembangunan Jaringan</li>
              <li>Layanan Pasang Baru</li>
              <li>Operasi dan Pemeliharaan Jaringan</li>
              <li>Jasa Layanan Operasi</li>
            </ul>
          </div>
          
          {/* Card Iklan Tambahan */}
          {/* ... other widgets ... */}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Telkom Akses. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
