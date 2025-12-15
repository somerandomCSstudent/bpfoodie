import React, { useState } from 'react';
// Assume React Icons is installed: npm install react-icons
import { FaStar, FaRegStar } from 'react-icons/fa'; 

/**
 * @interface StarRatingProps
 * Props for the StarRating component.
 */
interface StarRatingProps {
  initialRating: number;
  maxRating?: number;
  readOnly?: boolean;
  onRatingChange?: (newRating: number) => void;
}

/**
 * @function StarRating
 * A component to display and/or select a rating using stars.
 * It is highly event-driven (onMouseOver, onClick).
 * * @param {StarRatingProps} props Component props.
 * @returns {JSX.Element} The StarRating component.
 */
export const StarRating: React.FC<StarRatingProps> = ({ 
  initialRating, 
  maxRating = 5, 
  readOnly = false, 
  onRatingChange 
}) => {
  // Use let for the current state of the rating
  let [rating, setRating] = useState(initialRating);
  
  // Use let for the temporary hover rating
  let [hover, setHover] = useState(0);

  // Calculate stars array (5 elements by default)
  const stars = [...Array(maxRating)];

  /**
   * @function handleClick
   * Handles the click event on a star to set the final rating.
   * @param {number} newRating The rating value (1 to maxRating).
   */
  const handleClick = (newRating: number) => {
    if (readOnly) return;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  /**
   * @function handleMouseOver
   * Handles the mouse over event for interactive rating selection.
   * @param {number} index The index of the star being hovered over.
   */
  const handleMouseOver = (index: number) => {
    if (readOnly) return;
    setHover(index + 1);
  };

  /**
   * @function handleMouseOut
   * Handles the mouse out event to reset hover state.
   */
  const handleMouseOut = () => {
    if (readOnly) return;
    setHover(0);
  };

  // Determine the display rating (hover if active, otherwise current rating)
  const displayRating = hover || rating;

  return (
    <div className="star-rating" onMouseOut={handleMouseOut}>
      {stars.map((_, index) => {
        // let currentRating = index + 1; // Not needed, index is enough
        return (
          <span 
            key={index} 
            className="star"
            // Use an anonymous function for both onClick and onMouseOver for event listeners
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index)}
          >
            {/* If the current star index is less than the display rating, show a filled star */}
            {displayRating > index ? (
              <FaStar color="#ffc107" size={24} />
            ) : (
              <FaRegStar color="#e4e5e9" size={24} />
            )}
          </span>
        );
      })}
    </div>
  );
};