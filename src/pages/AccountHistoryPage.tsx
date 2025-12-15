import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ReviewDto } from '../dto/Review';
import { CommentItem } from '../components/restaurant/CommentItem';
// Import mock API function (assuming getMyReviews is in src/api/restaurant.ts)
import { getMyReviews } from '../api/restaurant'; 

/**
 * @function AccountHistoryPage
 * A protected page displaying the current user's review history.
 * @returns {JSX.Element} The AccountHistoryPage component.
 */
const AccountHistoryPage: React.FC = () => {
  const { user } = useAuth();

  // State variables using let
  let [myReviews, setMyReviews] = useState<ReviewDto[]>([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if user object exists (guaranteed by ProtectedRoute, but good practice)
    if (!user) return; 

    const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        let results = await getMyReviews(user.id);
        setMyReviews(results);
    } catch (error) { 
    // let errorMessage is used to hold the error message
    let errorMessage = "Failed to load your review history.";
    
    if (error instanceof Error) {
        errorMessage = error.message; 
    }

    setError(errorMessage);
    setMyReviews([]);
  } finally {
    setLoading(false);
  }
}, [user.id]);

    fetchHistory();
  }, [user]); // Re-fetch if user data changes

  // Use let for the user's name
  let userName = user?.username || 'User';

  return (
    <div className="account-history-page">
      <h1>{userName}'s Review History</h1>
      
      {loading && <p>Loading history...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && myReviews.length === 0 && !error && (
        <p>You have not submitted any reviews yet.</p>
      )}

      <div className="reviews-list">
        {myReviews.map(review => (
          // CommentItem displays the review
          <CommentItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AccountHistoryPage;