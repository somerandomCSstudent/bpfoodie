import React, { useState } from 'react';
import styles from './Header.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useAuth } from '../../../contexts/AuthContext';
import Modal from '../../Utils/Modal';
import LoginForm from '../../Auth/Login';
import RegisterForm from '../../Auth/Register';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const openModal = (isLogin: boolean) => {
    setIsLoginView(isLogin);
    setIsModalOpen(true);
  };

  return (
    <header className={styles.header}>
      {/* ... Left Controls ... */}
      <div className={styles.leftControls}>
        <ThemeToggle />
      </div>
      
      <h1 className={styles.logo}>BPFoodie🍽️🍹</h1> 

      <div className={styles.rightControls}>
        {currentUser ? (
          // Logged In State
          <div className={styles.loggedInStatus}>
            <span>Logged in as {currentUser.username}</span>
            <button className="button-primary" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          // Logged Out State
          <>
            <button className="button-primary" onClick={() => openModal(true)}>
              Login
            </button>
            <button className="button-primary" onClick={() => openModal(false)}>
              Register
            </button>
          </>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isLoginView ? 'Login to BPFoodie' : 'Register for BPFoodie'}
      >
        {isLoginView ? (
          <LoginForm onSuccess={() => setIsModalOpen(false)} />
        ) : (
          <RegisterForm onSuccess={() => setIsModalOpen(false)} />
        )}
        <p className={styles.switchAuth}>
            {isLoginView ? "Need an account?" : "Already have an account?"} 
            <span onClick={() => setIsLoginView(!isLoginView)} className={styles.switchLink}>
                {isLoginView ? " Register here" : " Login here"}
            </span>
        </p>
      </Modal>
    </header>
  );
};

export default Header;