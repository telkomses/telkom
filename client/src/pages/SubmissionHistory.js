import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../pages/UserNavbar'; // Import UserNavbar
import './SubmissionHistory.css';

function RiwayatPengajuan({ userId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/submissions/${userId}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <UserNavbar /> {/* Tambahkan UserNavbar di sini */}
      <div className="riwayat-pengajuan">
        <h2>Riwayat Pengajuan</h2>
        {submissions.length === 0 ? (
          <p>No submissions found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Lop</th>
                <th>Unit Bisnis</th>
                <th>Lokasi</th>
                <th>Program</th>
                <th>Ket Klarifikasi</th>
                <th>Nama Waspang</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.id}</td>
                  <td>{submission.namaLop}</td>
                  <td>{submission.unitBisnis}</td>
                  <td>{submission.lokasi}</td>
                  <td>{submission.program}</td>
                  <td>{submission.ketKlarifikasi}</td>
                  <td>{submission.namaWaspang}</td>
                  <td className={`status-${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 Telkom Akses. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RiwayatPengajuan;
