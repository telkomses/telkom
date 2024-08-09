import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './DataKetKlarifikasi.css';

const DataKetKlarifikasi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', ket_klarifikasi: '' });
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ket-klarifikasi');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching ket klarifikasi data:', error);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/count-ket-klarifikasi');
        const countsData = response.data.reduce((acc, item) => {
          acc[item.ket_klarifikasi] = item.count;
          return acc;
        }, {});
        setCounts(countsData);
      } catch (error) {
        console.error('Error fetching ket klarifikasi counts:', error);
      }
    };

    fetchData();
    fetchCounts();
    setLoading(false);
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ id: item.id, ket_klarifikasi: item.ket_klarifikasi });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/ket-klarifikasi/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting ket klarifikasi data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:3001/ket-klarifikasi/${formData.id}`, formData);
        setData(data.map((item) =>
          item.id === formData.id ? formData : item
        ));
      } else {
        await axios.post('http://localhost:3001/ket-klarifikasi', formData);
        setData([...data, formData]);
      }
      setShowForm(false);
      setEditingItem(null);
      setFormData({ id: '', ket_klarifikasi: '' });
    } catch (error) {
      console.error('Error submitting ket klarifikasi data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="data-ket-klarifikasi">
        <h2>Data Ket. Klarifikasi</h2>
        <button onClick={() => setShowForm(true)}>Tambah Data</button>
        {showForm && (
          <form onSubmit={handleSubmit} className="data-ket-klarifikasi-form">
            <label>ID:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                readOnly={!!editingItem}
              />
            </label>
            <label>Keterangan Klarifikasi:
              <input
                type="text"
                name="ket_klarifikasi"
                value={formData.ket_klarifikasi}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">{editingItem ? 'Update Data' : 'Tambah Data'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
        <table className="ket-klarifikasi-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Keterangan Klarifikasi</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ket_klarifikasi}</td>
                <td>{counts[item.ket_klarifikasi] || 0}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataKetKlarifikasi;
