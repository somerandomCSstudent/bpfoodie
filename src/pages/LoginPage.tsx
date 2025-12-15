import React, { useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface ChangeTarget extends EventTarget {
  name: string;
  value: string;
}

const initialFormData = {
  username: '',
  password: '',
};

const LoginPage: React.FC = () => {
  let [formData, setFormData] = useState(initialFormData);
  let [error, setError] = useState<string | null>(null);
  let [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); 

// Handles input changes for all fields (username, password).
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target as ChangeTarget; 
    let { name, value } = target; 

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };
  
   // Handles the login form submission
  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
        await login({ username: formData.username, password: formData.password });
        
        navigate('/'); 
    } catch (error) { 
        let errorMessage = "Login failed. Check username and password.";
        
        if (error instanceof Error) {
            errorMessage = error.message; 
        }

        setError(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  }, [formData, login, navigate]);

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            id="username"
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;