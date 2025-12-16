import React from 'react';
import { IReview } from '../../../types/review';
import styles from './ReviewSection.module.css';

interface ReviewCardProps {
  review: IReview;
}

const renderRatingStars = (rating: number) => {
  const fullStar = '⭐️';
  const emptyStar = '☆';
  return `${fullStar.repeat(Math.round(rating))}${emptyStar.repeat(5 - Math.round(rating))}`;
};

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