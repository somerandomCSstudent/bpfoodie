import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;