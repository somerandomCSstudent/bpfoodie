import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { INewReview } from '../../../types/review';
import styles from './ReviewSection.module.css';
/* Props for the ReviewForm component */
interface ReviewFormProps {
  restaurantId: string;
  onSubmit: (review: INewReview) => void;
}
/* Functional component definition */
const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, onSubmit }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null; // Should not happen if button visibility is managed correctly

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const parsedRating = parseInt(rating.toString(), 10);
    
    if (parsedRating < 1 || parsedRating > 5 || isNaN(parsedRating)) {
      setError('Rating must be a number between 1 and 5.');
      return;
    }

    if (comment.trim().length < 10) {
        setError('Comment must be at least 10 characters long.');
        return;
    }

    setIsSubmitting(true);
    // Simulate latency
    setTimeout(() => {
        onSubmit({ 
            restaurantId, 
            comment: comment.trim(), 
            rating: parsedRating 
        });
        
        // Reset form
        setComment('');
        setRating(5);
        setIsSubmitting(false);
    }, 500); 
  };
/* JSX for the review submission form */
  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3>Submit Your Review (as {currentUser.username})</h3>
      {error && <p className={styles.errorText}>Error: {error}</p>}
      
      <div className={styles.formGroup}>
        <label htmlFor="comment">Your Comment:</label>
        <textarea 
          id="comment"
          value={comment} 
          onChange={(e) => setComment((e.target as HTMLTextAreaElement).value)} 
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rating">Rating (1-5 Stars):</label>
        <input 
          id="rating"
          type="number" 
          value={rating} 
          onChange={(e) => setRating(parseInt((e.target as HTMLInputElement).value))} 
          min="1" 
          max="5" 
          required 
          disabled={isSubmitting}
          className={styles.ratingInput}
        />
      </div>

      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;