import React from 'react';
import styles from './Dropdown.module.css';
import { IRestaurantOption } from '../../types/restaurant';

interface DropdownProps {
  options: IRestaurantOption[];
  onSelect: (restaurantId: string) => void;
  selectedValue: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, selectedValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.currentTarget.value);
  };

  return (
    <select 
      className={styles.dropdown} 
      onChange={handleChange} 
      value={selectedValue}
    >
      <option value="" disabled>Choose a restaurant...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;