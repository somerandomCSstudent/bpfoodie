import { RestaurantDto, NewRestaurantDto, RestaurantCategory } from '../dto/Restaurant';
import { ReviewDto, NewReviewDto } from '../dto/Review';
import { UserDto } from '../dto/Auth';

// Mock database (using let to emphasize its variable nature)
let MOCK_RESTAURANTS: RestaurantDto[] = [
  { id: 'r1', name: 'Gundel Étterem', address: 'Budapest, XIV. kerület', category: RestaurantCategory.Hungarian, averageRating: 4.5, totalReviews: 20 },
  { id: 'r2', name: 'Trattoria Toscana', address: 'Budapest, V. kerület', category: RestaurantCategory.Italian, averageRating: 4.8, totalReviews: 45 },
  { id: 'r3', name: 'Vega Garden', address: 'Budapest, VI. kerület', category: RestaurantCategory.Vegan, averageRating: 3.9, totalReviews: 12 },
];

let MOCK_REVIEWS: ReviewDto[] = [
    { id: 'v1', restaurantId: 'r2', userId: 'u1', userName: 'Teszt Elek', rating: 5, comment: 'Simply the best pasta in town!', date: '2024-10-01' },
    { id: 'v2', restaurantId: 'r1', userId: 'u2', userName: 'Kovács Anna', rating: 4, comment: 'Traditional, but a bit pricey.', date: '2024-10-05' },
];

/**
 * @function searchRestaurants
 * Mock API call to search and filter restaurants.
 * @param {string} query Search term for name/address.
 * @param {RestaurantCategory | 'All'} category Category filter.
 * @returns {Promise<RestaurantDto[]>} List of filtered restaurants.
 */
export const searchRestaurants = async (query: string, category: RestaurantCategory | 'All'): Promise<RestaurantDto[]> => {
  return new Promise(resolve => {
    // let filteredList is used for intermediate filtering
    let filteredList: RestaurantDto[] = MOCK_RESTAURANTS.filter(r => {
      const nameMatch = r.name.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = category === 'All' || r.category === category;
      return nameMatch && categoryMatch;
    });
    
    // Simulate network delay
    setTimeout(() => resolve(filteredList), 500);
  });
};

// ... more API functions like getRestaurantDetails, etc.

/**
 * @function submitReview
 * Mock API call to submit a new review.
 * @param {NewReviewDto} newReview The new review data.
 * @param {UserDto} user The currently logged-in user.
 * @returns {Promise<ReviewDto>} The created review object.
 */
export const submitReview = async (newReview: NewReviewDto, user: UserDto): Promise<ReviewDto> => {
    return new Promise(resolve => {
        // let newId is used to generate a unique ID
        let newId = `v${MOCK_REVIEWS.length + 1}`;
        let createdReview: ReviewDto = {
            ...newReview,
            id: newId,
            userId: user.id,
            userName: user.username,
            date: new Date().toISOString().split('T')[0],
        };
        
        // Update mock database (in a real app, this would be a POST request)
        MOCK_REVIEWS.push(createdReview);
        
        // Simulate network delay
        setTimeout(() => resolve(createdReview), 300);
    });
}

/**
 * @function getRestaurantDetails
 * Mock API call to fetch a single restaurant's details.
 * @param {string} id The restaurant ID.
 * @returns {Promise<RestaurantDto | null>} The restaurant data.
 */
export const getRestaurantDetails = async (id: string): Promise<RestaurantDto | null> => {
    return new Promise(resolve => {
        let details = MOCK_RESTAURANTS.find(r => r.id === id) || null;
        setTimeout(() => resolve(details), 300);
    });
};

/**
 * @function getReviewsByRestaurantId
 * Mock API call to fetch all reviews for a restaurant.
 * @param {string} restaurantId The restaurant ID.
 * @returns {Promise<ReviewDto[]>} List of reviews.
 */
export const getReviewsByRestaurantId = async (restaurantId: string): Promise<ReviewDto[]> => {
    return new Promise(resolve => {
        let reviewsForRestaurant = MOCK_REVIEWS.filter(r => r.restaurantId === restaurantId);
        setTimeout(() => resolve(reviewsForRestaurant), 300);
    });
};

/**
 * @function getMyReviews
 * Mock API call to fetch reviews submitted by a specific user.
 * @param {string} userId The user ID.
 * @returns {Promise<ReviewDto[]>} List of reviews by the user.
 */
export const getMyReviews = async (userId: string): Promise<ReviewDto[]> => {
    return new Promise(resolve => {
        let userReviews = MOCK_REVIEWS.filter(r => r.userId === userId);
        setTimeout(() => resolve(userReviews), 300);
    });
};

/**
 * @function registerNewRestaurant
 * Mock API call to register a new restaurant.
 * @param {NewRestaurantDto} newRestaurantData Data for the new restaurant.
 * @returns {Promise<RestaurantDto>} The created restaurant object.
 */
export const registerNewRestaurant = async (newRestaurantData: NewRestaurantDto): Promise<RestaurantDto> => {
    return new Promise(resolve => {
        let newId = `r${MOCK_RESTAURANTS.length + 1}`;
        let createdRestaurant: RestaurantDto = {
            ...newRestaurantData,
            id: newId,
            averageRating: 0,
            totalReviews: 0,
        };
        
        // Update mock database
        MOCK_RESTAURANTS.push(createdRestaurant);
        
        setTimeout(() => resolve(createdRestaurant), 500);
    });
}
