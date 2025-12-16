import React, { useState } from 'react';
import { INewRestaurantData } from '../../../types/restaurant';
import styles from './AddRestaurantForm.module.css';
/* Form component for adding a new restaurant */
interface AddRestaurantFormProps {
  onSuccess: () => void;
  onSubmit: (data: INewRestaurantData) => void;
}
/* Functional component definition */
const AddRestaurantForm: React.FC<AddRestaurantFormProps> = ({ onSuccess, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 3 || description.trim().length < 10 || address.trim().length < 5) {
      setError('Please fill out all fields correctly (Name min 3, Description min 10 chars).');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      onSubmit({ name, description, address });
      setIsSubmitting(false);
      onSuccess(); // Close modal
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.errorText}>{error}</p>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Restaurant Name</label>
        <input 
          id="name"
          type="text" 
          value={name} 
          onChange={(e) => setName((e.target as HTMLInputElement).value)} 
          disabled={isSubmitting}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description">Short Description</label>
        <textarea 
          id="description"
          value={description} 
          onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} 
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="address">Address</label>
        <input 
          id="address"
          type="text" 
          value={address} 
          onChange={(e) => setAddress((e.target as HTMLInputElement).value)} 
          disabled={isSubmitting}
        />
      </div>
      
      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Restaurant'}
      </button>
    </form>
  );
};

export default AddRestaurantForm;