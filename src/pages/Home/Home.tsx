import React, { useState } from 'react';
import Header from '../../components/common/header/Header';
import Dropdown from '../../components/DropDown/DropDown';
import RestaurantDetails from '../../components/restaurant/RestaurantDetails/RestaurantDetails';
import { IRestaurant, IRestaurantOption } from '../../types/restaurant';
import styles from './Home.module.css';

// MARK: - Mock Adatok (Később API hívás váltja fel)
// ... rest of the file remains the same

// MARK: - Mock Adatok (Később API hívás váltja fel)
const mockRestaurants: IRestaurant[] = [
  { 
    id: 'r1', 
    name: 'Gundel Étterem', 
    description: 'Tradicionális magyar konyha, elegáns környezetben.', 
    address: 'Budapest, Zugló', 
    rating: 4.5, 
    reviewCount: 150,
    slug: 'gundel-etterem',
  },
  { 
    id: 'r2', 
    name: 'Costes', 
    description: 'Michelin-csillagos fine dining élmény a belvárosban.', 
    address: 'Budapest, Belváros', 
    rating: 4.8, 
    reviewCount: 90,
    slug: 'costes',
  },
  { 
    id: 'r3', 
    name: 'Burger King', 
    description: 'A második legismertebb amerikai gyorsétteremlánc világszerte.', 
    address: 'Budapest, Több helyen', 
    rating: 3.2, 
    reviewCount: 300,
    slug: 'burger-king',
  },
];

const restaurantOptions: IRestaurantOption[] = mockRestaurants.map(r => ({ id: r.id, name: r.name }));


const Home: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  
  const selectedRestaurant = mockRestaurants.find(r => r.id === selectedRestaurantId);

  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
  };

  return (
    <>
      <Header />
      <div className={styles.homeContainer}>
        {/* Étterem legördülő menü */}
        <div className={styles.dropdownWrapper}>
            <Dropdown 
              options={restaurantOptions} 
              onSelect={handleRestaurantSelect} 
              selectedValue={selectedRestaurantId}
            />
        </div>

        {/* Kiválasztott étterem adatainak megjelenítése */}
        {selectedRestaurant ? (
          <RestaurantDetails restaurant={selectedRestaurant} />
        ) : (
          <p className={styles.placeholder}>Please choose a restaurant from the list</p>
        )}
      </div>
    </>
  );
};

export default Home;