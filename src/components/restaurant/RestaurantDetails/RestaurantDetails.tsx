import React from 'react';
import { IRestaurant } from '../../../types/restaurant';
import styles from './RestaurantDetails.module.css';

interface RestaurantDetailsProps {
  restaurant: IRestaurant;
  averageRating: number;
  reviewCount: number;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurant, averageRating, reviewCount }) => {
  
  const renderRating = (rating: number) => {
    const fullStar = '⭐️';
    const emptyStar = '☆';
    // Round to nearest integer for display
    const fullStars = fullStar.repeat(Math.round(rating)); 
    const emptyStars = emptyStar.repeat(5 - Math.round(rating));
    return `${fullStars}${emptyStars} (${reviewCount} reviews)`;
  };

  return (
    <div className={styles.detailsContainer}>
      <h2>{restaurant.name}</h2>
      <p className={styles.description}>{restaurant.description}</p>
      <p><strong>Address:</strong> {restaurant.address}</p>
      
      {/* Display calculated average rating */}
      <p className={styles.rating}>
        <strong>Average Rating:</strong> {averageRating.toFixed(2)} / 5
        <br/>
        {renderRating(averageRating)}
      </p>
    </div>
  );
};

export default RestaurantDetails;