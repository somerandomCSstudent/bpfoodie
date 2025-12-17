import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// A simple registration form component
const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { register, isLoading } = useAuth(); // <<< call the useAuth hook to get register and isLoading
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await register(username, password); 

    if (result === true) {
      onSuccess(); // close modal on success
    } else if (typeof result === 'string') {
      // handling error: "Account with this username already exists."
      setError(result); 
    }
  };
  // Renders the registration form
  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div>
        <label htmlFor="register-username">Username</label>
        <input 
          id="register-username" 
          type="text" 
          value={username} 
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)} 
          required 
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="register-password">Password</label>
        <input 
          id="register-password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)} 
          required 
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;