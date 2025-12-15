// Data Transfer Object for a restaurant review
export interface ReviewDto {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string; 
}
 // Data Transfer Object for creating a new review
export interface NewReviewDto {
  restaurantId: string;
  rating: number;
  comment: string;
}