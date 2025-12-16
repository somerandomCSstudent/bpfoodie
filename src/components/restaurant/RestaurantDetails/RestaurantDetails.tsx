import React from 'react';
import { IRestaurant } from '../../../types/restaurant';
import styles from './RestaurantDetails.module.css';

interface RestaurantDetailsProps {
  restaurant: IRestaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurant }) => {
  // Csillagok megjelenítése az értékeléshez
  const renderRating = (rating: number) => {
    const fullStar = '⭐️';
    const emptyStar = '☆';
    const fullStars = fullStar.repeat(Math.round(rating));
    const emptyStars = emptyStar.repeat(5 - Math.round(rating));
    return `${fullStars}${emptyStars} (${restaurant.reviewCount} értékelés)`;
  };

  return (
    <div className={styles.detailsContainer}>
      <h2>{restaurant.name}</h2>
      <p className={styles.description}>{restaurant.description}</p>
      <p><strong>Cím:</strong> {restaurant.address}</p>
      <p className={styles.rating}>
        <strong>Értékelés:</strong> {renderRating(restaurant.rating)}
      </p>
      {/* További információk jöhetnek ide: képek, menü, stb. */}
    </div>
  );
};

export default RestaurantDetails;