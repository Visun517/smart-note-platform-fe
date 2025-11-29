import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Theme එක "light" හෝ "dark" පමණක් විය යුතු බවට Type එකක් හදමු
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  changeTheme: (mode: Theme) => void; // අලුත් Function එක (Direct Select කරන්න)
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // LocalStorage එකෙන් ගන්නවා (Cast as Theme type)
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // කෙලින්ම අදාළ Theme එක දාන්න පුළුවන් Function එකක්
  const changeTheme = (mode: Theme) => {
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};