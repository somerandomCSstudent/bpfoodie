export type Theme = 'light' | 'dark';

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
  // A téma változásakor alkalmazandó háttérszín
  backgroundColor: string; 
}