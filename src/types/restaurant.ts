/**
 * A Restaurant DTO (Data Transfer Object)
 */
export interface IRestaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number; // 1 to 5
  /** Összes értékelés száma */
  reviewCount: number; 
  /** A legördülő menühöz használt egyszerűsített típus */
  slug: string; // Pl. a URL-hez is használható
}

// Csak a legördülő menü számára szükséges egyszerűsített adatok
export interface IRestaurantOption {
  id: string;
  name: string;
}