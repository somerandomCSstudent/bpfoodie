import React from 'react';
import { ReviewDto } from '../../dto/Review';
import { StarRating } from '../common/StarRating';

/**
 * @interface CommentItemProps
 * Props for displaying a single review/comment.
 */
interface CommentItemProps {
  review: ReviewDto;
}

/**
 * @function CommentItem
 * Displays a single user review with rating and comment.
 * @param {CommentItemProps} props Component props.
 * @returns {JSX.Element} The CommentItem component.
 */
export const CommentItem: React.FC<CommentItemProps> = ({ review }) => {
  // Use let for the date object
  let reviewDate = new Date(review.date).toLocaleDateString();

  return (
    <div className="comment-item">
      <div className="comment-header">
        <strong>{review.userName}</strong> 
        <span className="comment-date">reviewed on {reviewDate}</span>
      </div>
      
      <StarRating initialRating={review.rating} readOnly />
      
      <p className="comment-text">"{review.comment}"</p>
    </div>
  );
};