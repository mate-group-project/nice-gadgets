import React from 'react';
import './SuccessModal.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation.ts';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{t('checkout.successMessage')}</h2>

        <button
          onClick={onClose}
          className="button"
          style={{ width: '180px' }}
        >
          {t('checkout.back')}
        </button>
      </div>
    </div>
  );
};
