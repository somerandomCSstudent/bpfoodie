import React, { useState } from 'react';
import { NewRestaurantDto, RestaurantCategory } from '../dto/Restaurant';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { registerNewRestaurant } from '../api/restaurant';

// src/pages/RegisterRestaurantPage.tsx (a többi import alatt)
interface ChangeTarget extends EventTarget {
  name: string;
  value: string;
}

/**
 * @function RegisterRestaurantPage
 * A protected page for authenticated users to register a new restaurant.
 * @returns {JSX.Element} The RegisterRestaurantPage component.
 */
const RegisterRestaurantPage: React.FC = () => {
  const navigate = useNavigate();

  // Initial state for the form, based on the DTO
  let [formData, setFormData] = useState<NewRestaurantDto>({
    name: '',
    address: '',
    category: RestaurantCategory.Hungarian, // Default category
  });
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [message, setMessage] = useState<string | null>(null);

  /**
   * @function handleChange
   * Handles input changes for all fields. (Event-driven: onChange)
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} event The change event.
   */
// src/pages/RegisterRestaurantPage.tsx (handleChange függvény)
const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => { 
  
  // let target explicit castolva az egyedi interfészre, ami garantálja a name és value-t
  let target = event.target as ChangeTarget; 
  let { name, value } = target; 

  setFormData(prevData => ({
    ...prevData,
    [name]: value as RestaurantCategory,
  }));
  setMessage(null);
};

  /**
   * @function handleSubmit
   * Handles form submission to register the new restaurant. (Event-driven: onSubmit)
   * @param {React.FormEvent<HTMLFormElement>} event The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Basic validation using let for the form data
    let { name, address } = formData;
    if (!name || !address) {
      setMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // let newRestaurant = await registerNewRestaurant(formData); // Mock API call
      // Simulate success delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let successMessage = `${formData.name} successfully registered! Redirecting...`;
      setMessage(successMessage);
      
      // Redirect after a short delay
      setTimeout(() => navigate('/'), 1500); 
    } catch (error) {
      let errorMessage = 'Registration failed. Try again.';
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Categories for the select dropdown
  const categories = Object.values(RestaurantCategory);

  return (
    <div className="register-restaurant-page">
      <h2>Register a New Restaurant</h2>
      
      {message && <p className={`info-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="registration-form">
        <Input 
          id="name"
          label="Restaurant Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input 
          id="address"
          label="Full Address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
        />
        
        {/* Category Select (Event-driven: onChange) */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            name="category"
            className="form-input" 
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register Restaurant'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterRestaurantPage;