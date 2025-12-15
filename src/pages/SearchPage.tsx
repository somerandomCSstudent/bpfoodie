import React, { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { RestaurantDto, RestaurantCategory } from '../dto/Restaurant';
import { searchRestaurants } from '../api/restaurant';
import { Input } from '../components/common/Input';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';

/**
 * @function SearchPage
 * The main page for searching and viewing restaurants.
 * @returns {JSX.Element} The SearchPage component.
 */
const SearchPage: React.FC = () => {
  // Use let for state variables
  let [restaurants, setRestaurants] = useState<RestaurantDto[]>([]);
  let [searchQuery, setSearchQuery] = useState('');
  let [selectedCategory, setSelectedCategory] = useState<RestaurantCategory | 'All'>('All');
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState<string | null>(null);

  /**
   * @function handleSearch
   * Fetches restaurants based on the current search criteria.
   * Uses useCallback for memoization.
   */
  // src/pages/SearchPage.tsx (handleSearch useCallback függvény)
const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        // let results is used to hold the promise result
        let results: RestaurantDto[] = await searchRestaurants(searchQuery, selectedCategory);
        setRestaurants(results);
    } catch (error) { // FIX: Használjunk "error"-t "err" helyett, és kezeljük
        let errorMessage = 'Failed to fetch restaurants. Please try again.';
        
        // Ha szeretnéd használni a hibaüzenetet:
        if (error instanceof Error) {
            errorMessage = error.message; 
        }

        setError(errorMessage);
        setRestaurants([]);
    } finally {
        setLoading(false);
    }
}, [searchQuery, selectedCategory]);

  // useEffect to trigger search when query or category changes
  useEffect(() => {
    // let timeoutId is used to debounce the search input
    let timeoutId = setTimeout(() => {
      handleSearch();
    }, 300); // Debounce delay

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, handleSearch]);

  /**
 * @function handleQueryChange
 * Handles the input change event for the search query. (Event-driven: onChange)
 * @param {React.ChangeEvent<HTMLInputElement>} event The change event.
 */
// src/pages/SearchPage.tsx (handleQueryChange függvény)
// Térjünk vissza a React.ChangeEvent használatához, mert a SonarQube hibák nem állítják le a fordítást
const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
  // let target explicit castolva a pontos típusra (a korábbi 'value' hiba miatt)
  let target = event.target as HTMLInputElement; 
  let newValue = target.value; 
  setSearchQuery(newValue);
};
 /**
 * @function handleCategoryChange
 * Handles the select change event for the category filter.
 * @param {React.ChangeEvent<HTMLSelectElement>} event The change event.
 */
// src/pages/SearchPage.tsx (handleCategoryChange függvény)
const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  // Explicit cast a select elemre
  let target = event.target as HTMLSelectElement; 
  let newCategory = target.value as RestaurantCategory | 'All'; 
  setSelectedCategory(newCategory);
};
  
  // Memoized list of categories for the dropdown
  const categories = useMemo(() => ['All', ...Object.values(RestaurantCategory)], []);

  return (
    <div className="search-page">
      <h1>Restaurant Finder</h1>
      <div className="search-controls">
        {/* Input field with onChange event listener */}
        <Input 
          id="search-query"
          label="Search by Name or Address"
          type="text"
          value={searchQuery}
          onChange={handleQueryChange}
        />
        
        {/* Category select with onChange event listener */}
        <div className="form-group">
          <label htmlFor="category-select">Category</label>
          <select 
            id="category-select" 
            className="form-input" 
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading restaurants...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && restaurants.length === 0 && !error && (
        <p>No restaurants found matching your criteria.</p>
      )}

      <div className="restaurant-list">
        {restaurants.map(restaurant => (
          // RestaurantCard handles its own onClick to view details
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;