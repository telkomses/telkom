import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './DataVendor.css'; // Import CSS file for styling

const DataVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', vendor: '' });
  const [counts, setCounts] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vendor-counts');
        const countsData = response.data.reduce((acc, item) => {
          acc[item.vendor] = item.count;
          return acc;
        }, {});
        setCounts(countsData);
      } catch (error) {
        console.error('Error fetching vendor counts:', error);
      }
    };

    fetchVendors();
    fetchCounts();
  }, []);

  const handleAdd = () => {
    setFormData({ id: '', vendor: '' });
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, vendor: item.vendor });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/vendors/${id}`);
      setVendors(vendors.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:3001/vendors/${formData.id}`, { vendor: formData.vendor });
        setVendors(vendors.map((item) =>
          item.id === formData.id ? { ...item, vendor: formData.vendor } : item
        ));
      } else {
        const response = await axios.post('http://localhost:3001/vendors', { vendor: formData.vendor });
        setVendors([...vendors, response.data]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting vendor data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="data-vendor">
        <h2>Data Vendor</h2>
        <button onClick={handleAdd}>Tambah Data</button>
        {showForm && (
          <form onSubmit={handleSubmit} className="data-vendor-form">
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
            <label>Vendor Name:
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">{editingItem ? 'Update Data' : 'Tambah Data'}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
        <table className="vendor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>
                  {editingItem === vendor.id ? (
                    <input
                      type="text"
                      value={formData.vendor}
                      onChange={(e) => setFormData((prevData) => ({ ...prevData, vendor: e.target.value }))}
                    />
                  ) : (
                    vendor.vendor
                  )}
                </td>
                <td>{counts[vendor.vendor] || 0}</td>
                <td>
                  {editingItem === vendor.id ? (
                    <button onClick={() => handleSubmit}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(vendor)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(vendor.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DataVendor;
