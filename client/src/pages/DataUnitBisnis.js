import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './DataUnitBisnis.css'; // Import CSS file for styling

const DataUnitBisnis = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', unit_bisnis: '' });
  const [counts, setCounts] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('http://localhost:3001/unit-bisnis');
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching unit bisnis data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/count-unit-bisnis');
        const countsData = response.data.reduce((acc, item) => {
          acc[item.unit_bisnis] = item.count;
          return acc;
        }, {});
        setCounts(countsData);
      } catch (error) {
        console.error('Error fetching unit bisnis counts:', error);
      }
    };

    fetchUnits();
    fetchCounts();
  }, []);

  const handleAdd = () => {
    setFormData({ id: '', unit_bisnis: '' });
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, unit_bisnis: item.unit_bisnis });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/unit-bisnis/${id}`);
      setUnits(units.filter(unit => unit.id !== id));
    } catch (error) {
      console.error('Error deleting unit bisnis:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:3001/unit-bisnis/${formData.id}`, { unit_bisnis: formData.unit_bisnis });
        setUnits(units.map((item) =>
          item.id === formData.id ? { ...item, unit_bisnis: formData.unit_bisnis } : item
        ));
      } else {
        const response = await axios.post('http://localhost:3001/unit-bisnis', { unit_bisnis: formData.unit_bisnis });
        setUnits([...units, response.data]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting unit bisnis data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="data-unit-bisnis">
        <h2>Data Unit Bisnis</h2>
        <button onClick={handleAdd}>Tambah Data</button>
        {showForm && (
          <form onSubmit={handleSubmit} className="data-unit-bisnis-form">
            {editingItem && (
              <label>ID:
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                />
              </label>
            )}
            <label>Unit Bisnis:
              <input
                type="text"
                name="unit_bisnis"
                value={formData.unit_bisnis}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">{editingItem ? 'Update Data' : 'Tambah Data'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
        <table className="unit-bisnis-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Unit Bisnis</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.id}</td>
                <td>{unit.unit_bisnis}</td>
                <td>{counts[unit.unit_bisnis] || 0}</td>
                <td>
                  <button onClick={() => handleEdit(unit)}>Edit</button>
                  <button onClick={() => handleDelete(unit.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataUnitBisnis;
