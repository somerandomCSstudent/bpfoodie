import React from 'react';

// Props for a generic button component.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Children are the button content
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'danger';
  // onClick is the main event listener used
}

// A reusable, styled button component.
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...rest 
}) => {
  // Use let to compose the full class name
  let fullClassName = `button button-${variant} ${className}`;
  
  return (
    <button 
      className={fullClassName} 
      {...rest}
    >
      {children}
    </button>
  );
};