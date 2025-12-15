/**
 * @type Status
 * Defines the possible states for asynchronous operations 
 * across the application (e.g., loading, success, error).
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * @interface KeyValuePair
 * A generic interface for simple key-value mappings.
 * It ensures the key is always a string and the value can be anything.
 * This is useful for dynamically generated form data or configuration objects.
 * * @template T The type of the value stored in the pair.
 */
export interface KeyValuePair<T = any> {
  key: string;
  value: T;
}

/**
 * @type Maybe
 * Utility type to indicate that a value might be null or undefined.
 * @template T The base type.
 */
export type Maybe<T> = T | null | undefined;

/**
 * @interface GlobalAppState
 * A structure to represent highly simplified global state structure, 
 * often used for root application settings beyond Auth and Theme.
 */
export interface GlobalAppState {
  version: string;
  isOnline: boolean;
  lastUpdated: Maybe<Date>;
}

// NOTE: Specific DTOs (UserDto, RestaurantDto) are kept in the 'dto' folder 
// to maintain separation of concerns. This file focuses on general utility types.