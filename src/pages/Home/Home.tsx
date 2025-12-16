// src/pages/Home/Home.tsx - REFACTORED

import { useState, useMemo, useCallback } from "preact/hooks";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";
import { INewReview, IReview } from "../../types/review";
import { IRestaurant, INewRestaurantData, IRestaurantOption } from "../../types/restaurant"; 
import { mockRestaurants } from "../../data/mockRestaurants";
import { initialReviews } from "../../data/mockReviews";
import Dropdown from "../../components/DropDown/DropDown";
import Header from "../../components/common/header/Header";
import RestaurantPage from "../RestaurantPage/RestaurantPage"; 

 // Main component handling global data state (restaurants, reviews) and logic.
 // Serves as the primary data manager and view selector.
const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  // All state management remains here (Source of Truth)
  const [restaurants, setRestaurants] = useState<IRestaurant[]>(mockRestaurants);
  const [reviews, setReviews] = useState<IReview[]>(initialReviews); 
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  
  // Find the currently selected restaurant object from the state
  const selectedRestaurant = restaurants.find(r => r.id === selectedRestaurantId);

 
  // Handles the submission of a new restaurant and updates the state.
  
  const handleAddRestaurant = useCallback((newRestaurantData: INewRestaurantData) => {
    // Logic for generating ID and slug
    const newId = `r${restaurants.length + 1}`;
    const newSlug = newRestaurantData.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    const newRestaurant: IRestaurant = {
        id: newId,
        name: newRestaurantData.name,
        description: newRestaurantData.description,
        address: newRestaurantData.address,
        slug: newSlug,
        rating: 0,
        reviewCount: 0,
    };

    setRestaurants((prev) => [...prev, newRestaurant]);
    setSelectedRestaurantId(newId); 
  }, [restaurants.length]);


 
  // Handles new review submissions and updates the state.
  
  const handleReviewSubmit = useCallback((newReview: INewReview) => {
    if (!currentUser) return;
    
    const completeReview: IReview = {
      id: Date.now().toString(),
      restaurantId: newReview.restaurantId,
      username: currentUser.username,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: Date.now()
    };
    
    setReviews((prevReviews) => [completeReview, ...prevReviews]); 
  }, [currentUser]);
   // Updates the selected restaurant ID when the dropdown changes.
  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
  };
   // Creates restaurant options for the dropdown. Memoized for performance.
  const restaurantOptions: IRestaurantOption[] = useMemo(() => {
    return restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name
    }));
  }, [restaurants]);

  // JSX for the Home component including header, dropdown
  return (
    <>
      <Header onAddRestaurant={handleAddRestaurant} /> 
      
      {/* Container maintains the overall layout structure */}
      <div className={styles.homeContainer}> 
        
        {/* Restaurant Selection Dropdown remains in the main component */}
        <div className={styles.dropdownWrapper}>
            <Dropdown 
              options={restaurantOptions} 
              onSelect={handleRestaurantSelect} 
              selectedValue={selectedRestaurantId}
            />
        </div>

        {/* Conditional rendering of the dedicated RestaurantPage component */}
        {selectedRestaurant ? (
          // Renders the new child component for the detailed view
          <RestaurantPage
            restaurant={selectedRestaurant}
            reviews={reviews}
            onSubmitReview={handleReviewSubmit}
          />
        ) : (
          <p className={styles.placeholder}>Please select a restaurant from the list.</p>
        )}
      </div>
    </>
  );
};

export default Home;