// cuisine categories
export type RestaurantType = 
  | 'Italian'
  | 'East-Asian'
  | 'American'
  | 'South-American'
  | 'Hungarian'
  | 'Other';
// Interface for Restaurant data
export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number; // 1 to 5
  reviewCount: number; // number of reviews
  slug: string; // Optional: for SEO-friendly URLs
  type: RestaurantType; // restaurant category
}

// only for dropdown menu options
export interface IRestaurantOption {
  id: string;
  name: string;
}
// for addition of a new restaurant
export interface INewRestaurantData {
  name: string;
  description: string;
  address: string;
  type: RestaurantType; // user selected category
}