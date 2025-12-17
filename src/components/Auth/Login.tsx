import { useAuth } from "../../contexts/AuthContext";
import React, { useState } from "react";
// A simple login form component
const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login, isLoading } = useAuth(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
// Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ...
    const result = await login(username, password); 
    // ...
  };
  // Renders the login form
  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} placeholder="Password" type="password" />
      <button type="submit" disabled={isLoading}>Login</button>
    </form>
  );
};

export default LoginForm;