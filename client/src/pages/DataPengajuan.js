import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout'; // Import AdminLayout
import './DataPengajuan.css';

const DataPengajuan = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleEditStatus = async (id, newStatus) => {
    try {
      await axios.post(`http://localhost:3001/admin/update-status/${id}`, { status: newStatus });
      setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFileUpload = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:3001/admin/upload-file/${id}`, formData);
      setSubmissions(submissions.map(sub => sub.id === id ? { ...sub, file: file.name } : sub));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="data-pengajuan">
        <h2>Data Pengajuan</h2>
        <table className="pengajuan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Lop</th>
              <th>Unit Bisnis</th>
              <th>Lokasi</th>
              <th>Program</th>
              <th>Ket Klarifikasi</th>
              <th>Nama Waspang</th>
              <th>V4 Checklist</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>{submission.v4Checklist}</td>
                <td>
                  <a href={`http://localhost:3001/uploads/${submission.file}`} download>
                    {submission.file}
                  </a>
                </td>
                <td className={`status-${submission.status.toLowerCase()}`}>
                  {submission.status}
                </td>
                <td>
                  <button onClick={() => handleEditStatus(submission.id, 'Approved')}>
                    Set as Approved
                  </button>
                  <button onClick={() => handleEditStatus(submission.id, 'Rejected')}>
                    Set as Rejected
                  </button>
                  <input 
                    type="file" 
                    onChange={(e) => handleFileUpload(submission.id, e.target.files[0])}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataPengajuan;
