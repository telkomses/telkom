import React from 'react';
import { Link} from 'react-router-dom';
import { FaFileAlt, FaClipboardCheck, FaTasks, FaBuilding, FaUserTie, FaUsers} from 'react-icons/fa';
import './AdminLayout.css';

const AdminSidebar = () => {

  return (
    <aside className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin/data-pengajuan">
            <FaFileAlt /> Data Pengajuan
          </Link>
        </li>
        <li>
          <Link to="/admin/data-ket-klarifikasi">
            <FaClipboardCheck /> Data Ket. Klarifikasi
          </Link>
        </li>
        <li>
          <Link to="/admin/data-program">
            <FaTasks /> Data Program
          </Link>
        </li>
        <li>
          <Link to="/admin/data-unit-bisnis">
            <FaBuilding /> Data Unit Bisnis
          </Link>
        </li>
        <li>
          <Link to="/admin/data-vendor">
            <FaUserTie /> Data Vendor
          </Link>
        </li>
        <li>
          <Link to="/admin/data-users">
            <FaUsers /> Data User
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
