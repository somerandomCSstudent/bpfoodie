// src/components/Auth/RegisterForm.tsx (Példa)

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// Szükség esetén importálhatsz stílusokat

const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { register, isLoading } = useAuth(); // <<< ITT HÍVJA A 'register' FÜGGVÉNYT
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await register(username, password); // <<< AUTH KONTEXTUS LOGIKÁJA

    if (result === true) {
      onSuccess(); // Close modal on success
    } else if (typeof result === 'string') {
      // Hiba kezelése, pl. "Account with this username already exists."
      setError(result); 
    }
  };

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