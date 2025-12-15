import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// Feltételezett DTO-k és API importok
import { getRestaurantDetails, getReviewsByRestaurantId } from '../api/restaurant';
import { RestaurantDto } from '../dto/Restaurant';
import { ReviewDto } from '../dto/Review';
import {ReviewForm } from '../components/restaurant/ReviewForm'; // Feltételezett import

/**
 * @function RestaurantDetailsPage
 * Displays the detailed information and reviews for a specific restaurant.
 */
// FIX: A FunctionComponent<{}> JSDoc hiba elkerülésére a függvény aláírása a standard React.FC
const RestaurantDetailsPage: React.FC = () => {
    // let restaurant is used to store the restaurant details
    let [restaurant, setRestaurant] = useState<RestaurantDto | null>(null);
    // let reviews is used to store the list of reviews
    let [reviews, setReviews] = useState<ReviewDto[]>([]);
    // let loading is used to track the loading state
    let [loading, setLoading] = useState(true);
    // let error is used to store any error messages
    let [error, setError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>(); 

    /**
     * @function fetchData
     * Fetches restaurant details and reviews concurrently.
     */
    const fetchData = useCallback(async (restaurantId: string) => {
        setLoading(true);
        setError(null);
        
        try {
            // let results is used to hold the array of fetched data
            let [details, reviewList] = await Promise.all([
                getRestaurantDetails(restaurantId),
                getReviewsByRestaurantId(restaurantId)
            ]);

            setRestaurant(details);
            setReviews(reviewList);
        } catch (error) { 
            // FIX: SonarQube S2486 hibajavítás
            let errorMessage = "Could not load restaurant data. Please try again.";
            
            if (error instanceof Error) {
                errorMessage = error.message; 
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchData(id);
        } else {
            setError("No restaurant ID provided.");
            setLoading(false);
        }
    }, [id, fetchData]);
    
    /**
     * @function handleNewReview
     * Adds a newly submitted review to the reviews list.
     * FIX: Várja a ReviewDto típusú argumentumot a ReviewForm-tól kapott adat alapján
     */
    const handleNewReview = useCallback((newReview: ReviewDto) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);
    }, []);


    if (loading) {
        return <div className="details-container">Loading restaurant details...</div>;
    }

    if (error) {
        return <div className="details-container error-message">Error: {error}</div>;
    }
    
    if (!restaurant) {
        return <div className="details-container error-message">Restaurant not found.</div>;
    }

    return (
        <div className="details-page-container">
            {/* Restaurant Details Section */}
            <h1>{restaurant.name}</h1>
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Category:</strong> {restaurant.category}</p>
            
            <hr />

            {/* Review Form Section */}
            {/* A restaurantId stringként kerül átadásra */}

            {/* Reviews List Section */}
            <h2>Reviews ({reviews.length})</h2>
            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <p><strong>{review.userName}</strong> rated: {review.rating}/5</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantDetailsPage;