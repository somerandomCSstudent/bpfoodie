import React from 'react';
import { IReview } from '../../../types/review';
import styles from './ReviewSection.module.css';
// Props for the ReviewCard component 
interface ReviewCardProps {
  review: IReview;
}
// Function to render rating stars based on the numeric rating 
const renderRatingStars = (rating: number) => {
  const fullStar = '⭐️';
  const emptyStar = '☆';
  return `${fullStar.repeat(Math.round(rating))}${emptyStar.repeat(5 - Math.round(rating))}`;
};
// Functional component definition 
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.cardHeader}>
        <span className={styles.ratingStars}>{renderRatingStars(review.rating)}</span>
        <span className={styles.username}>Left by {review.username}</span>
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <small>{new Date(review.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default ReviewCard;