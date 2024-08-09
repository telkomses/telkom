import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SubmissionPage.css';
import UserNavbar from './UserNavbar'; // Import UserNavbar

function SubmissionPage({ userId }) {
  const [namaLop, setNamaLop] = useState('');
  const [unitBisnis, setUnitBisnis] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [program, setProgram] = useState('');
  const [ketKlarifikasi, setKetKlarifikasi] = useState('');
  const [namaWaspang, setNamaWaspang] = useState('');
  const [file, setFile] = useState(null);
  const [unitBisnisOptions, setUnitBisnisOptions] = useState([]);
  const [lokasiOptions, setLokasiOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [ketKlarifikasiOptions, setKetKlarifikasiOptions] = useState([]);
  const [v4ChecklistOptions] = useState([
    { value: 'struktur-koordinat', label: 'Struktur Koordinat' },
    { value: 'spesifikasi', label: 'Spesifikasi' },
    { value: 'label', label: 'Label' },
    { value: 'core-management', label: 'Core Management' },
    { value: 'barcode', label: 'Barcode' },
    { value: 'evidence', label: 'Evidence' },
  ]);
  const [selectedV4Checklist, setSelectedV4Checklist] = useState([]);

  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [unitBisnisRes, lokasiRes, programRes, ketKlarifikasiRes] = await Promise.all([
          axios.get('http://localhost:3001/unit-bisnis'),
          axios.get('http://localhost:3001/lokasi'),
          axios.get('http://localhost:3001/program'),
          axios.get('http://localhost:3001/ket-klarifikasi'),
        ]);

        setUnitBisnisOptions(unitBisnisRes.data);
        setLokasiOptions(lokasiRes.data);
        setProgramOptions(programRes.data);
        setKetKlarifikasiOptions(ketKlarifikasiRes.data);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('namaLop', namaLop);
    formData.append('unitBisnis', unitBisnis);
    formData.append('lokasi', lokasi);
    formData.append('program', program);
    formData.append('ketKlarifikasi', ketKlarifikasi);
    formData.append('namaWaspang', namaWaspang);
    formData.append('v4Checklist', selectedV4Checklist.join(',')); // Menggabungkan opsi yang dipilih dengan koma
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('status', 'Pending');

    try {
      await axios.post('http://localhost:3001/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Submission successful');
      navigate('/user'); // Arahkan ke halaman /user setelah berhasil
    } catch (err) {
      alert('Submission failed');
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedV4Checklist(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="submission-page">
      <UserNavbar /> {/* Tambahkan UserNavbar di sini */}
      <div className="submission-container">
        <form onSubmit={handleSubmit}>
          <h2>Submit Project</h2>
          <input
            type="text"
            placeholder="Nama Lop"
            value={namaLop}
            onChange={(e) => setNamaLop(e.target.value)}
          />
          <select
            value={unitBisnis}
            onChange={(e) => setUnitBisnis(e.target.value)}
            required
          >
            <option value="">Select Unit Bisnis</option>
            {unitBisnisOptions.map((option) => (
              <option key={option.id} value={option.unit_bisnis}>
                {option.unit_bisnis}
              </option>
            ))}
          </select>
          <select
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            required
          >
            <option value="">Select Lokasi</option>
            {lokasiOptions.map((option) => (
              <option key={option.id} value={option.lokasi}>
                {option.lokasi}
              </option>
            ))}
          </select>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            required
          >
            <option value="">Select Program</option>
            {programOptions.map((option) => (
              <option key={option.id} value={option.program}>
                {option.program}
              </option>
            ))}
          </select>
          <select
            value={ketKlarifikasi}
            onChange={(e) => setKetKlarifikasi(e.target.value)}
            required
          >
            <option value="">Select Ket Klarifikasi</option>
            {ketKlarifikasiOptions.map((option) => (
              <option key={option.id} value={option.ket_klarifikasi}>
                {option.ket_klarifikasi}
              </option>
            ))}
          </select>
          <div className="v4-checklist">
            <label>V4 Checklist</label>
            <div className="v4-checklist-container">
              {v4ChecklistOptions.map(option => (
                <div key={option.value} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    checked={selectedV4Checklist.includes(option.value)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <input
            type="text"
            placeholder="Nama Waspang"
            value={namaWaspang}
            onChange={(e) => setNamaWaspang(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Telkom Akses. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SubmissionPage;
