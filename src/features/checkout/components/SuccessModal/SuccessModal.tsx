import React from 'react';
import './SuccessModal.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Order placed successfully</h2>

        <button
          onClick={onClose}
          className="button"
          style={{ width: '180px' }}
        >
          Back to shopping
        </button>
      </div>
    </div>
  );
};
