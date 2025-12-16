import { useState, useMemo, useCallback } from "preact/hooks";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";
import { INewReview, IReview } from "../../types/review";
import { IRestaurant, INewRestaurantData, IRestaurantOption } from "../../types/restaurant"; 
import { mockRestaurants } from "../../data/mockRestaurants";
import { initialReviews } from "../../data/mockReviews";
import Dropdown from "../../components/DropDown/DropDown";
import RestaurantDetails from "../../components/restaurant/RestaurantDetails/RestaurantDetails";
import ReviewSection from "../../components/restaurant/ReviewSection/ReviewSection";
import Header from "../../components/common/header/Header";

/**
 * Main component handling global data state (restaurants, reviews) and logic.
 */
const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  // State for all restaurants, initialized with mock data.
  // This state is necessary to allow adding new restaurants.
  const [restaurants, setRestaurants] = useState<IRestaurant[]>(mockRestaurants);
  const [reviews, setReviews] = useState<IReview[]>(initialReviews); 
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  
  // Find the currently selected restaurant object from the state
  const selectedRestaurant = restaurants.find(r => r.id === selectedRestaurantId);

  /**
   * Handles the submission of a new restaurant and updates the state.
   * @param newRestaurantData Data from the AddRestaurantForm.
   */
  const handleAddRestaurant = useCallback((newRestaurantData: INewRestaurantData) => {
    // Generate unique ID based on current list length (for mock data)
    const newId = `r${restaurants.length + 1}`;
    
    // Generate simple slug (e.g., "Gundel Restaurant" -> "gundel-restaurant")
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

    // Add new restaurant to the list state
    setRestaurants((prev) => [...prev, newRestaurant]);
    
    // Select the newly added restaurant
    setSelectedRestaurantId(newId); 
  }, [restaurants.length]);


  /**
   * Handles new review submissions and updates the state.
   * @param newReview The review data submitted from the form.
   */
  const handleReviewSubmit = useCallback((newReview: INewReview) => {
    if (!currentUser) return; // Must be logged in
    
    const completeReview: IReview = {
      id: Date.now().toString(),
      restaurantId: newReview.restaurantId,
      username: currentUser.username,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: Date.now()
    };
    
    // Add new review to the beginning of the list
    setReviews((prevReviews) => [completeReview, ...prevReviews]); 
  }, [currentUser]);


  /**
   * Calculates the average rating and review count for a specific restaurant.
   * @param restaurantId The ID of the restaurant.
   */
  const calculateAverageRating = useCallback((restaurantId: string) => {
    const restaurantReviews = reviews.filter(r => r.restaurantId === restaurantId);
    if (restaurantReviews.length === 0) {
      return { rating: 0, count: 0 };
    }
    const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / restaurantReviews.length;
    return { rating: averageRating, count: restaurantReviews.length };
  }, [reviews]);

  /**
   * Updates the selected restaurant ID when the dropdown changes.
   * @param id The ID of the selected restaurant.
   */
  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
  };

  /**
   * Creates restaurant options for the dropdown, derived from the current state.
   * Uses useMemo to optimize calculation when 'restaurants' state changes.
   */
  const restaurantOptions: IRestaurantOption[] = useMemo(() => {
    return restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name
    }));
  }, [restaurants]); // Re-calculate only when the list of restaurants changes


  // Get current restaurant details + calculated stats
  const currentStats = selectedRestaurant 
    ? calculateAverageRating(selectedRestaurant.id) 
    : { rating: 0, count: 0 };


  return (
    <>
      {/* Pass the handler for adding a new restaurant to the Header */}
      <Header onAddRestaurant={handleAddRestaurant} /> 
      
      {/* NOTE: The error "Property 'homeContainer' does not exist" suggests a 
        TypeScript configuration issue with CSS modules. Please ensure your 
        project setup correctly recognizes '.module.css' imports as types.
      */}
      <div className={styles.homeContainer}> 
        {/* Dropdown */}
        <div className={styles.dropdownWrapper}>
            <Dropdown 
              options={restaurantOptions} 
              onSelect={handleRestaurantSelect} 
              selectedValue={selectedRestaurantId}
            />
        </div>

        {/* Restaurant Details and Reviews */}
        {selectedRestaurant ? (
          <>
            <RestaurantDetails 
              restaurant={selectedRestaurant}
              averageRating={currentStats.rating} // Pass average rating
              reviewCount={currentStats.count}    // Pass review count
            />
            
            <div className={styles.reviewSectionWrapper}>
              <ReviewSection 
                restaurantId={selectedRestaurant.id}
                reviews={reviews}
                onSubmitReview={handleReviewSubmit}
              />
            </div>
          </>
        ) : (
          <p className={styles.placeholder}>Please select a restaurant from the list.</p>
        )}
      </div>
    </>
  );
};

export default Home;