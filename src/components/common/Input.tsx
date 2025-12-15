import React from 'react';

/**
 * @interface InputProps
 * Props for a generic controlled input component.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  // onChange is already included via extends, but we document its importance
}

/**
 * @function Input
 * A reusable input field with a label. Highly event-driven via onChange.
 * @param {InputProps} props Component props.
 * @returns {JSX.Element} The Input component.
 */
export const Input: React.FC<InputProps> = ({ label, id, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {/* The onChange event listener is critical here */}
      <input id={id} className="form-input" {...rest} />
    </div>
  );
};