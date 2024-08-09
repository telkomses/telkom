import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './DataProgram.css'; // Import CSS file for styling

const DataProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', program: '' });
  const [counts, setCounts] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/programs');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/count-programs');
        const countsData = response.data.reduce((acc, item) => {
          acc[item.program] = item.count;
          return acc;
        }, {});
        setCounts(countsData);
      } catch (error) {
        console.error('Error fetching program counts:', error);
      }
    };

    fetchPrograms();
    fetchCounts();
  }, []);

  const handleAdd = () => {
    setFormData({ id: '', program: '' });
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, program: item.program });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/programs/${id}`);
      setPrograms(programs.filter(program => program.id !== id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem) {
        // Update existing program
        await axios.put(`http://localhost:3001/programs/${formData.id}`, { program: formData.program });
        setPrograms(programs.map((item) =>
          item.id === formData.id ? { ...item, program: formData.program } : item
        ));
      } else {
        // Add new program
        const response = await axios.post('http://localhost:3001/programs', { program: formData.program });
        setPrograms([...programs, response.data]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting program data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="data-program">
        <h2>Data Program</h2>
        <button onClick={handleAdd}>Tambah Data</button>
        {showForm && (
          <form onSubmit={handleSubmit} className="data-program-form">
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
            <label>Program Name:
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">{editingItem ? 'Update Data' : 'Tambah Data'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
        <table className="program-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Program Name</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id}>
                <td>{program.id}</td>
                <td>{program.program}</td>
                <td>{counts[program.program] || 0}</td>
                <td>
                  <button onClick={() => handleEdit(program)}>Edit</button>
                  <button onClick={() => handleDelete(program.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataProgram;
