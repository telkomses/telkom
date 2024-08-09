import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import SubmissionPage from './pages/SubmissionPage';
import SubmissionHistory from './pages/SubmissionHistory';
import DataPengajuan from './pages/DataPengajuan'; 
import DataKetKlarifikasi from './pages/DataKetKlarifikasi';
import DataProgram from './pages/DataProgram';
import DataUnitBisnis from './pages/DataUnitBisnis';
import DataVendor from './pages/DataVendor';
import DataUsers from './pages/DataUsers';
import SekilasPerusahaan from './pages/SekilasPerusahaan';
import DewanKomisaris from './pages/DewanKomisaris';
import Direksi from './pages/Direksi';
import Penghargaan from './pages/Penghargaan';
import PembangunanJaringan from './pages/PembangunanJaringan';
import LayananPasang from './pages/LayananPasang';
// import Pemeliharaan from './pages/Pemeliharaan';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  console.log('App userId:', userId);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute userId={userId}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-pengajuan" element={
          <ProtectedRoute userId={userId}>
            <DataPengajuan />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute userId={userId}>
            <UserPage userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/submit" element={
          <ProtectedRoute userId={userId}>
            <SubmissionPage userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/submission-history" element={
          <ProtectedRoute userId={userId}>
            <SubmissionHistory userId={userId} />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-ket-klarifikasi" element={
          <ProtectedRoute userId={userId}>
            <DataKetKlarifikasi />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-program" element={
          <ProtectedRoute userId={userId}>
            <DataProgram />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-unit-bisnis" element={
          <ProtectedRoute userId={userId}>
            <DataUnitBisnis />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-vendor" element={
          <ProtectedRoute userId={userId}>
            <DataVendor />
          </ProtectedRoute>
        } />
        <Route path="/admin/data-users" element={
          <ProtectedRoute userId={userId}>
            <DataUsers />
          </ProtectedRoute>
        } />
        <Route path="/sekilas-perusahaan" element={
          <ProtectedRoute userId={userId}>
            <SekilasPerusahaan />
          </ProtectedRoute>
        } />
        <Route path="/dewan-komisaris" element={
          <ProtectedRoute userId={userId}>
            <DewanKomisaris />
          </ProtectedRoute>
        } />
        <Route path="/direksi" element={
          <ProtectedRoute userId={userId}>
            <Direksi />
          </ProtectedRoute>
        } />
        <Route path="/penghargaan-sertifikasi" element={
          <ProtectedRoute userId={userId}>
            <Penghargaan />
          </ProtectedRoute>
        } />
        <Route path="/pembangunan-jaringan" element={
          <ProtectedRoute userId={userId}>
            <PembangunanJaringan />
          </ProtectedRoute>
        } />
        <Route path="/layanan-pasang-baru" element={
          <ProtectedRoute userId={userId}>
            <LayananPasang/>
          </ProtectedRoute>
        } />
        {/* <Route path="/operasi-pemeliharaan" element={
          <ProtectedRoute userId={userId}>
            <Pemeliharaan/>
          </ProtectedRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;
