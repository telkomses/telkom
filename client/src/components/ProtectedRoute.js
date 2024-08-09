import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userId }) => {
  console.log('ProtectedRoute userId:', userId); // Log untuk memeriksa userId
  if (!userId) {
    // Jika userId tidak ada, arahkan ke halaman login
    return <Navigate to="/" />;
  }
  // Jika userId ada, tampilkan komponen anak-anak
  return children;
};

export default ProtectedRoute;
