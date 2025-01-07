import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    // Load saved mode or default to "alwaysLight"
    return localStorage.getItem('themeMode') || 'alwaysLight';
  });

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themeMode', themeMode);
  };

  const determineDynamicTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'light' : 'dark';
  };

  useEffect(() => {
    if (themeMode === 'dynamic') {
      const dynamicTheme = determineDynamicTheme();
      applyTheme(dynamicTheme);

      // Check every hour for updates
      const intervalId = setInterval(() => {
        const newDynamicTheme = determineDynamicTheme();
        applyTheme(newDynamicTheme);
      }, 3600000);

      return () => clearInterval(intervalId); // Cleanup on unmount
    } else {
      const theme = themeMode === 'alwaysLight' ? 'light' : 'dark';
      applyTheme(theme);
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
