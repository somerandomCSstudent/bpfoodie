// Data Transfer Object for user login request
export interface LoginDto {
  username: string;
  password: string;
}
// Data Transfer Object for user profile data returned by the API
export interface UserDto {
  id: string;
  username: string;
  email: string;
}