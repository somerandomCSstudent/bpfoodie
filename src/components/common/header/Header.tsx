import React, { useState } from 'react';
import styles from './Header.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useAuth } from '../../../contexts/AuthContext';
import Modal from '../../Utils/Modal';
import LoginForm from '../../Auth/Login';
import RegisterForm from '../../Auth/Register';
import AddRestaurantForm from '../../restaurant/AddRestaurant/AddRestaurantForm';
import { INewRestaurantData } from '../../../types/restaurant';

interface HeaderProps {
  onAddRestaurant: (newRestaurantData: INewRestaurantData) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddRestaurant }) => {
  const { currentUser, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const openAuthModal = (isLogin: boolean) => {
    setIsLoginView(isLogin);
    setIsAuthModalOpen(true);
  };

  const handleAddRestaurant = (newRestaurantData: INewRestaurantData) => {
    onAddRestaurant(newRestaurantData);
    setIsAddRestaurantModalOpen(false);
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
            <button className="button-primary" onClick={() => setIsAddRestaurantModalOpen(true)}>
              Add new restaurant...
            </button>
            <button className="button-primary" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          // Logged Out State
          <>
            <button className="button-primary" onClick={() => openAuthModal(true)}>
              Login
            </button>
            <button className="button-primary" onClick={() => openAuthModal(false)}>
              Register
            </button>
          </>
        )}
      </div>

      {/* Add Restaurant Modal - Only visible when logged in */}
      <Modal 
        isOpen={isAddRestaurantModalOpen} 
        onClose={() => setIsAddRestaurantModalOpen(false)} 
        title="Add a New Restaurant"
      >
        <AddRestaurantForm 
          onSuccess={() => setIsAddRestaurantModalOpen(false)}
          onSubmit={handleAddRestaurant}
        />
      </Modal>

      {/* Auth Modal */}
      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        title={isLoginView ? 'Login to BPFoodie' : 'Register for BPFoodie'}
      >
        {isLoginView ? (
          <LoginForm onSuccess={() => setIsAuthModalOpen(false)} />
        ) : (
          <RegisterForm onSuccess={() => setIsAuthModalOpen(false)} />
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