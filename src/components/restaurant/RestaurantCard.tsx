import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantDto } from '../../dto/Restaurant';
import { StarRating } from '../common/StarRating';

/**
 * @interface RestaurantCardProps
 * Props for the restaurant listing card.
 */
interface RestaurantCardProps {
  restaurant: RestaurantDto;
}

/**
 * @function RestaurantCard
 * Displays a summary of a restaurant. Clickable to view details.
 * @param {RestaurantCardProps} props Component props.
 * @returns {JSX.Element} The RestaurantCard component.
 */
export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  /**
   * @function handleClick
   * Navigates to the restaurant details page. (Event-driven: onClick)
   * @param {React.MouseEvent<HTMLDivElement>} event The click event.
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  // Use let for the formatted review count string
  let reviewText = `(${restaurant.totalReviews} reviews)`;

  return (
    <div className="card restaurant-card" onClick={handleClick}>
      <h3>{restaurant.name}</h3>
      <p>Category: <strong>{restaurant.category}</strong></p>
      
      <div className="rating-display">
        {/* Read-only Star Rating */}
        <StarRating initialRating={restaurant.averageRating} readOnly />
        <span>{restaurant.averageRating.toFixed(1)} / 5</span>
      </div>
      
      <p className="review-count">{reviewText}</p>
      <p className="address-snippet">{restaurant.address}</p>
    </div>
  );
};