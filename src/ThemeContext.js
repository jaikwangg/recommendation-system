import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
