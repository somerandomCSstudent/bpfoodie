import React, { useState, useCallback, FormEvent } from 'react';
// Feltételezett importok
import { useAuth } from '../../context/AuthContext'; 
import { submitReview } from '../../api/restaurant'; 
import { ReviewDto } from '../../dto/Review'; 

interface ReviewFormProps {
    restaurantId: string; 
    onReviewSubmitted: (newReview: ReviewDto) => void; 
}

// Interfész az input elemek kezeléséhez
interface ChangeTarget extends EventTarget {
    value: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, onReviewSubmitted }) => {
    // let rating is used to store the numerical rating
    let [rating, setRating] = useState(5);
    // let comment is used to store the user's text comment
    let [comment, setComment] = useState('');
    // let error is used to store any error messages
    let [error, setError] = useState<string | null>(null);
    // let isSubmitting is used to track the submission status
    let [isSubmitting, setIsSubmitting] = useState(false);

    const { user, isAuthenticated } = useAuth(); // Feltételezett Auth Context használata

    /**
     * @function handleCommentChange
     * Handles the change event for the textarea using type assertion.
     */
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // let target explicit castolva a pontos típusra
        let target = event.target as ChangeTarget; 
        let newValue = target.value; 
        setComment(newValue);
    };

    /**
     * @function handleSubmit
     * Handles the form submission logic.
     */
    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isAuthenticated || !user) {
            setError('You must be logged in to submit a review.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        // let newReviewData is used to structure the review data
        let newReviewData: Omit<ReviewDto, 'id' | 'date'> = {
            // FIX 2: restaurantId stringként átadva (megoldja a korábbi parseInt() hibákat)
            restaurantId: restaurantId, 
            
            // FIX 1: Hiányzó userId és userName hozzáadva (megoldja a missing properties hibát)
            userId: user.id, 
            userName: user.username, 
            
            rating,
            comment,
        };

        try {
            // Feltételezett API hívás
            let submittedReview: ReviewDto = await submitReview(newReviewData, user); 
            
            // Reset form state
            setComment('');
            setRating(5); // Visszaállítás 5-re
            onReviewSubmitted(submittedReview); // Átadja a beküldött véleményt
        } catch (error) {
            // FIX 4: SonarQube S2486 hibajavítás: típusbiztos hibakezelés
            // let errorMessage is used to hold the error message
            let errorMessage = "Failed to submit review.";
            
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }, [rating, comment, restaurantId, isAuthenticated, user, onReviewSubmitted]);

    return (
        <div className="review-form-container">
            <h3>Add Your Review</h3>
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                {/* Rating Input */}
                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5)</label>
                    <input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(parseInt((e.target as ChangeTarget).value, 10) || 0)} 
                        required
                    />
                </div>

                {/* Comment Textarea */}
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange} // A hibajavított handler
                        rows={4}
                        className="form-input"
                        required
                    ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;