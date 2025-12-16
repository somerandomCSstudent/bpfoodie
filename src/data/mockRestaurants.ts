import { IRestaurant } from "../types/restaurant";

export const mockRestaurants: IRestaurant[] = [
  {
    id: "1",
    name: "Citta di Milano",
    description: "Észak olasz ízek",
    address: "Budapest, Andrássy út 12.",
    rating: 4.5,
    reviewCount: 12,
    slug: "italian-kitchen"
  },
  {
    id: "2",
    name: "Sushi Paradise",
    description: "Fresh Japanese sushi and seafood",
    address: "Budapest, XI. kerület, Fő u. 12.",
    rating: 4.8,
    reviewCount: 28,
    slug: "sushi-paradise"
  },
  {
    id: "3",
    name: "Best Burger",
    description: "Classic American burgers",
    address: "Budapest, VII. kerület, Rákóczi út 45.",
    rating: 4.2,
    reviewCount: 45,
    slug: "burger-house"
  }
];