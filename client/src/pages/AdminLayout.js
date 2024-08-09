import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminAppBar from './AdminAppBar';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminAppBar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
