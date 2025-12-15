/**
 * Enum for restaurant categories.
 * @readonly
 * @enum {string}
 */
export enum RestaurantCategory {
  Italian = "Italian",
  Hungarian = "Hungarian",
  Asian = "Asian",
  Vegan = "Vegan",
  FastFood = "FastFood",
}

/**
 * @interface RestaurantDto
 * Data Transfer Object for a restaurant.
 */
export interface RestaurantDto {
  id: string;
  name: string;
  address: string;
  category: RestaurantCategory;
  averageRating: number; // Calculated average
  totalReviews: number;
}

/**
 * @interface NewRestaurantDto
 * Data Transfer Object for registering a new restaurant.
 */
export interface NewRestaurantDto {
  name: string;
  address: string;
  category: RestaurantCategory;
}