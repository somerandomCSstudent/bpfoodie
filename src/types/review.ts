/** Structure for a single user review */
export interface IReview {
  id: string;
  restaurantId: string;
  username: string; // Left by [Username]
  rating: number; // 1 to 5 scale
  comment: string;
  createdAt: number; // Timestamp
}

/** Structure for submitting a new review */
export interface INewReview {
  restaurantId: string;
  rating: number; 
  comment: string;
}