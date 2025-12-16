import { IReview } from "../types/review";

export const initialReviews: IReview[] = [
  {
    id: "r1",
    restaurantId: "1",
    username: "John Doe",
    rating: 5,
    comment: "Delicious pasta! Highly recommend.",
    createdAt: Date.now() - 86400000
  },
  {
    id: "r2",
    restaurantId: "1",
    username: "Jane Smith",
    rating: 4,
    comment: "Good food, a bit slow service.",
    createdAt: Date.now() - 172800000
  },
  {
    id: "r3",
    restaurantId: "2",
    username: "Bob Johnson",
    rating: 5,
    comment: "Fresh and delicious sushi!",
    createdAt: Date.now() - 259200000
  }
];