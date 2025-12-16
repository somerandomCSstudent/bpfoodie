// src/components/Restaurant/ReviewSection/ReviewSection.tsx

import React, { useState } from 'react';
import { IReview, INewReview } from '../../../types/review';
import { useAuth } from '../../../contexts/AuthContext';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import styles from './ReviewSection.module.css';
/* Props for the ReviewSection component */
interface ReviewSectionProps {
  restaurantId: string;
  reviews: IReview[];
  onSubmitReview: (review: INewReview) => void;
}
/* Functional component definition */
const ReviewSection: React.FC<ReviewSectionProps> = ({ restaurantId, reviews, onSubmitReview }) => {
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);

  // Filter reviews for the current restaurant
  const restaurantReviews = reviews.filter(r => r.restaurantId === restaurantId);
  
  // Check if the user has already reviewed this restaurant
  const hasUserReviewed = currentUser ? restaurantReviews.some(r => r.username === currentUser.username) : false;

  const handleSuccessfulSubmit = (review: INewReview) => {
    onSubmitReview(review);
    setShowForm(false); // Hide the form after submission
  };
/* JSX for the review section including list and form */
  return (
    <div className={styles.reviewSection}>
      <h2>User Reviews ({restaurantReviews.length})</h2>

      {currentUser && !hasUserReviewed && (
        <button 
          className="button-primary" 
          onClick={() => setShowForm(!showForm)}
          style={{ marginBottom: '20px' }}
        >
          {showForm ? 'Cancel Review' : 'Submit Review'}
        </button>
      )}

      {showForm && currentUser && (
        <ReviewForm restaurantId={restaurantId} onSubmit={handleSuccessfulSubmit} />
      )}

      <div className={styles.reviewList}>
        {restaurantReviews.length > 0 ? (
          restaurantReviews
            .sort((a, b) => b.createdAt - a.createdAt) // Show newest first
            .map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <p>No reviews yet. Be the first to rate this restaurant!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;