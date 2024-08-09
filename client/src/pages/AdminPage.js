import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import './AdminPage.css';

const AdminDashboard = () => {
  const [overview, setOverview] = useState({
    users: 0,
    totalSubmissions: 0,
    pendingSubmissions: 0,
    rejectedSubmissions: 0,
    approvedSubmissions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/overview');
        setOverview(response.data);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h2>Welcome to Admin Dashboard</h2>
      <div className="overview-cards">
        <div className="card users">
          <div className="card-icon">👥</div>
          <h3>Jumlah User</h3>
          <p>{overview.users}</p>
        </div>
        <div className="card total-submissions">
          <div className="card-icon">📋</div>
          <h3>Jumlah Total Pengajuan</h3>
          <p>{overview.totalSubmissions}</p>
        </div>
        <div className="card pending-submissions">
          <div className="card-icon">⌛</div>
          <h3>Jumlah Pengajuan Pending</h3>
          <p>{overview.pendingSubmissions}</p>
        </div>
        <div className="card rejected-submissions">
          <div className="card-icon">❌</div>
          <h3>Jumlah Pengajuan Rejected</h3>
          <p>{overview.rejectedSubmissions}</p>
        </div>
        <div className="card approved-submissions">
          <div className="card-icon">✔️</div>
          <h3>Jumlah Pengajuan Approved</h3>
          <p>{overview.approvedSubmissions}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
