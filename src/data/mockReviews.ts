import { IReview } from "../types/review";

export const initialReviews: IReview[] = [
  {
    id: "r1",
    restaurantId: "1",
    username: "bestuser12",
    rating: 5,
    comment: "best pasta I've ever had",
    createdAt: Date.now() - 86400000
  },
  {
    id: "r2",
    restaurantId: "1",
    username: "immer_fresser",
    rating: 4,
    comment: "Good food, a bit slow service.",
    createdAt: Date.now() - 172800000
  },
  {
    id: "r3",
    restaurantId: "2",
    username: "katica92",
    rating: 5,
    comment: "excellent ramen",
    createdAt: Date.now() - 259200000
  }
];