import { createContext } from 'react';
import { ThemeContextInterface } from '../types/theme';

const ThemeContext = createContext<ThemeContextInterface>({
  theme: localStorage.getItem('theme') || 'theme-auto',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
});

export default ThemeContext;
