import { IRestaurant } from "../types/restaurant";

export const mockRestaurants: IRestaurant[] = [
  {
    id: "1",
    name: "The Italian Kitchen",
    description: "Authentic Italian cuisine",
    address: "123 Main St",
    rating: 4.5,
    reviewCount: 12,
    slug: "italian-kitchen"
  },
  {
    id: "2",
    name: "Sushi Paradise",
    description: "Fresh Japanese sushi and seafood",
    address: "456 Oak Ave",
    rating: 4.8,
    reviewCount: 28,
    slug: "sushi-paradise"
  },
  {
    id: "3",
    name: "The Burger House",
    description: "Classic American burgers",
    address: "789 Pine Rd",
    rating: 4.2,
    reviewCount: 45,
    slug: "burger-house"
  }
];