import React, { useCallback, useMemo } from 'react';
import RestaurantDetails from '../../components/restaurant/RestaurantDetails/RestaurantDetails';
import ReviewSection from '../../components/restaurant/ReviewSection/ReviewSection';
import { IRestaurant } from '../../types/restaurant';
import { IReview, INewReview } from '../../types/review';


 // Props for RestaurantPage component
 // In a future router implementation, the restaurant data would be fetched based on a route parameter (e.g., /restaurant/:id).
interface RestaurantPageProps {
  restaurant: IRestaurant;
  reviews: IReview[];
  onSubmitReview: (review: INewReview) => void;
}

 // displays the detailed information and the review section for a single restaurant.

const RestaurantPage: React.FC<RestaurantPageProps> = ({ restaurant, reviews, onSubmitReview }) => {


     // calculates the average rating and review count for the current restaurant.
    
    const calculateAverageRating = useCallback(() => {
        const restaurantReviews = reviews.filter(r => r.restaurantId === restaurant.id);
        
        if (restaurantReviews.length === 0) {
            return { rating: 0, count: 0 };
        }
        
        const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / restaurantReviews.length;
        
        return { rating: averageRating, count: restaurantReviews.length };
    }, [reviews, restaurant.id]);
    
    // Memoize stats to avoid recalculation on unrelated renders
    const currentStats = useMemo(() => calculateAverageRating(), [calculateAverageRating]);
    // JSX for the RestaurantPage component including details and reviews
    return (
        <>
            <RestaurantDetails 
                restaurant={restaurant}
                averageRating={currentStats.rating}
                reviewCount={currentStats.count}
            />
            
            {/* The Review section uses a separate wrapper style, assuming the original Home.module.css defines it */}
            {/* We cannot access styles.reviewSectionWrapper here, so we wrap it generically */}
            <div style={{ marginTop: '20px' }}> 
                <ReviewSection 
                    restaurantId={restaurant.id}
                    reviews={reviews.filter(r => r.restaurantId === restaurant.id)} // Filter reviews specifically for this page
                    onSubmitReview={onSubmitReview}
                />
            </div>
        </>
    );
};

export default RestaurantPage;