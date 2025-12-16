export type Theme = 'light' | 'dark';
/* Interface for Theme Context */
export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
  backgroundColor: string; 
}