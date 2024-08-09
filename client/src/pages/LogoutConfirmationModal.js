import React from 'react';
import './LogoutConfirmationModal.css';

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Konfirmasi Logout</h2>
        <p>Apakah Anda yakin ingin logout?</p>
        <div className="modal-actions">
          <button className="modal-button confirm-button" onClick={onConfirm}>Ya</button>
          <button className="modal-button cancel-button" onClick={onCancel}>Tidak</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
