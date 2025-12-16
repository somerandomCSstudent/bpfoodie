import { useState, useMemo, useCallback } from "preact/hooks";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";
import { INewReview, IReview } from "../../types/review";
// Import RestaurantType for filtering
import { IRestaurant, INewRestaurantData, IRestaurantOption, RestaurantType } from "../../types/restaurant"; 
import { mockRestaurants } from "../../data/mockRestaurants";
import { initialReviews } from "../../data/mockReviews";
import Dropdown from "../../components/DropDown/DropDown";
import Header from "../../components/common/header/Header";
import RestaurantPage from "../RestaurantPage/RestaurantPage"; 

// Define a type for the filter, including 'All'
type FilterType = RestaurantType | 'All';
const ALL_RESTAURANT_TYPES: FilterType[] = [
  'All', 
  'Italian',
  'East-Asian',
  'American',
  'South-American',
  'Hungarian',
  'Other'
];

 // Main component handling global data state (restaurants, reviews) and logic.
 // Serves as the primary data manager and view selector.
const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  // All state management remains here (Source of Truth)
  const [restaurants, setRestaurants] = useState<IRestaurant[]>(mockRestaurants);
  const [reviews, setReviews] = useState<IReview[]>(initialReviews); 
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<FilterType>('All');
  
  // Find the currently selected restaurant object from the state
  const selectedRestaurant = restaurants.find(r => r.id === selectedRestaurantId);

  
  // >>>>>>>>>>>>>> JS API #1: Audio API bevezetése <<<<<<<<<<<<<<<<
  // Helper function to create and play a sound using the Web Audio API
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType, startGain: number, endGain: number) => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.warn("Web Audio API not supported. Cannot play sound.");
      return;
    }

    try {
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      gainNode.gain.setValueAtTime(startGain, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(endGain, audioCtx.currentTime + duration);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
      console.log("Audio API: Selection success sound played.");
    } catch (e) {
      console.error("Error playing sound with Audio API:", e);
    }
  }, []);
 
  // Handles the submission of a new restaurant and updates the state.
  
  const handleAddRestaurant = useCallback((newRestaurantData: INewRestaurantData) => {
    // Logic for generating ID and slug
    const newId = `r${restaurants.length + 1}`;
    const newSlug = newRestaurantData.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    const newRestaurant: IRestaurant = {
        id: newId,
        name: newRestaurantData.name,
        description: newRestaurantData.description,
        address: newRestaurantData.address,
        slug: newSlug,
        rating: 0,
        reviewCount: 0,
        type: newRestaurantData.type, // Include the new 'type'
    };

    setRestaurants((prev) => [...prev, newRestaurant]);
    setSelectedRestaurantId(newId); 
    // Optionally set the filter to the newly added restaurant's type
    setSelectedType(newRestaurantData.type); 
  }, [restaurants.length]);


 
  // Handles new review submissions and updates the state.
  
  const handleReviewSubmit = useCallback((newReview: INewReview) => {
    if (!currentUser) return;
    
    const completeReview: IReview = {
      id: Date.now().toString(),
      restaurantId: newReview.restaurantId,
      username: currentUser.username,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: Date.now()
    };
    
    setReviews((prevReviews) => [completeReview, ...prevReviews]); 
  }, [currentUser]);
  
  
  // MEMOIZED: Filter restaurants based on the selected type
  const filteredRestaurants = useMemo(() => {
    if (selectedType === 'All') {
      return restaurants;
    }
    return restaurants.filter(r => r.type === selectedType);
  }, [restaurants, selectedType]);


   // Updates the selected restaurant ID when the dropdown changes.
  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
    // HANG: Rövid, magas hang a választás megerősítésére (JS API #1: Audio API)
    playSound(880, 0.05, 'triangle', 0.7, 0.001); // A5 (880 Hz)
  };
  
  // Handler for the type selection dropdown
  const handleTypeSelect = (type: string) => {
    setSelectedType(type as FilterType);
    
    // When changing the filter, ensure a valid restaurant is selected, 
    // or clear the selection if the list is empty.
    const restaurantsInNewType = restaurants.filter(r => r.type === type || type === 'All');
    if (!restaurantsInNewType.some(r => r.id === selectedRestaurantId)) {
      // If the previously selected restaurant is no longer in the filtered list,
      // select the first one in the new list, or clear the selection.
      setSelectedRestaurantId(restaurantsInNewType.length > 0 ? restaurantsInNewType[0].id : '');
    }
  };


   // Creates restaurant options for the dropdown. Memoized for performance.
  const restaurantOptions: IRestaurantOption[] = useMemo(() => {
    // Use filtered restaurants for the dropdown options
    return filteredRestaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name
    }));
  }, [filteredRestaurants]);

  // JSX for the Home component including header, dropdown
  return (
    <>
      <Header onAddRestaurant={handleAddRestaurant} /> 
      
      {/* Container maintains the overall layout structure */}
      <div className={styles.homeContainer}> 

        {/* Eltávolítottam az Audio API-ról szóló információs üzenetet innen. */}
        
        {/* 1. Restaurant Selection Dropdown (Top) */}
        <div className={styles.dropdownWrapper}>
            <p><strong>Select Restaurant:</strong></p> 
            <Dropdown 
              options={restaurantOptions} 
              onSelect={handleRestaurantSelect} // EZ INDÍTJA A HANGOT
              selectedValue={selectedRestaurantId}
            />
        </div>

        {/* Space between the two dropdowns (20px as requested) */}
        <div style={{ paddingBottom: '20px' }}/>

        {/* 2. Type Selection Dropdown (Bottom) */}
        <div className={styles.dropdownWrapper}>
            <p><strong>Filter by Type:</strong></p> 
            <Dropdown 
              // Options include 'All' and all specific types
              options={ALL_RESTAURANT_TYPES.map(t => ({ id: t, name: t }))} 
              onSelect={handleTypeSelect} 
              selectedValue={selectedType}
            />
        </div>
        
        {/* Filter Status Message */}
        {selectedType !== 'All' && (
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                Only restaurants by category <span style={{ color: '#007bff' }}>{selectedType}</span> are being shown
            </p>
        )}


        {/* Conditional rendering of the dedicated RestaurantPage component */}
        {selectedRestaurant ? (
          // Renders the new child component for the detailed view
          <RestaurantPage
            restaurant={selectedRestaurant}
            reviews={reviews}
            onSubmitReview={handleReviewSubmit}
          />
        ) : (
          <p className={styles.placeholder}>
            {/* Display message based on filter state */}
            {selectedType === 'All' ? "Please select a restaurant from the list." : `No restaurants found in the '${selectedType}' category.`}
          </p>
        )}
      </div>
    </>
  );
};

export default Home;