// src/context/FavoritesContext.js
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteUsers")) || [];
    setFavorites(stored);
  }, []);

  const makeFavorite = (user) => {
    if (!favorites.find((fav) => fav.id === user.id)) {
      const updated = [...favorites, user];
      setFavorites(updated);
      localStorage.setItem("favoriteUsers", JSON.stringify(updated));
    }
  };
  const removeFavorite = (userId) => {
    const updated = favorites.filter(user => user.id !== userId);
    setFavorites(updated);
    localStorage.setItem("favoriteUsers", JSON.stringify(updated));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, makeFavorite , removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
