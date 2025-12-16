/** Data structure for user account identification */
export interface IUser {
  username: string;
  // A password is used only during login/registration, 
  // not stored in the state.
}

/** Data structure for the authentication state context */
export interface IAuthContext {
  currentUser: IUser | null;
  login: (username: string, password: string) => Promise<boolean | string>;
  register: (username: string, password: string) => Promise<boolean | string>;
  logout: () => void;
  isLoading: boolean;
}