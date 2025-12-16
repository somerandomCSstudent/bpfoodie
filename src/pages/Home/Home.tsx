import { useState } from "preact/hooks";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";
import { INewReview, IReview } from "../../types/review";
import { IRestaurant } from "../../types/restaurant";
import { mockRestaurants } from "../../data/mockRestaurants";
import { initialReviews } from "../../data/mockReviews";
import Dropdown from "../../components/DropDown/DropDown";
import RestaurantDetails from "../../components/restaurant/RestaurantDetails/RestaurantDetails";
import ReviewSection from "../../components/restaurant/ReviewSection/ReviewSection";
import Header from "../../components/common/header/Header";

const Home: React.FC = () => {
  const { currentUser } = useAuth(); // NEW: Get current user
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [reviews, setReviews] = useState<IReview[]>(initialReviews); 
  
  const selectedRestaurant = mockRestaurants.find(r => r.id === selectedRestaurantId);

  // handles new review submissions
  const handleReviewSubmit = (newReview: INewReview) => {
  if (!currentUser) return;
  
  const completeReview: IReview = {
    id: Date.now().toString(), // Generate unique ID
    restaurantId: newReview.restaurantId,
    username: currentUser.username,
    rating: newReview.rating,
    comment: newReview.comment,
    createdAt: Date.now()
  };
  
  setReviews([...reviews, completeReview]);
};
  // calculate average rating and review count for a restaurant
  const calculateAverageRating = (restaurantId: string) => {
    const restaurantReviews = reviews.filter(r => r.restaurantId === restaurantId);
    if (restaurantReviews.length === 0) {
      return { rating: 0, count: 0 };
    }
    const averageRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0) / restaurantReviews.length;
    return { rating: averageRating, count: restaurantReviews.length };
  };

  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
  };

  // Create restaurant options for dropdown
  const restaurantOptions = mockRestaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name
  }));

  // Get current restaurant details + calculated stats
  const currentStats = selectedRestaurant 
    ? calculateAverageRating(selectedRestaurant.id) 
    : { rating: 0, count: 0 };


  return (
    <>
      <Header />
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