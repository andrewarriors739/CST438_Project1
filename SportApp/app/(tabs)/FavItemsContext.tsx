import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavItemsContextType = {
  favItemIds: string[];
  toggleFavItemById: (itemId: string) => void;
  checkIsFavItem: (itemId: string) => boolean;
};

const FavItemsContext = createContext<FavItemsContextType | undefined>(undefined);

export const FavItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favItemIds, setFavItemIds] = useState<string[]>([]);

  useEffect(() => {
    getStoredFavItems();
  }, []);

  useEffect(() => {
    saveFavItemsToStorage();
  }, [favItemIds]);

  const saveFavItemsToStorage = async () => {
    try {
      await AsyncStorage.setItem('favItemIds', JSON.stringify(favItemIds));
    } catch (err) {
      console.error("Error saving favorite items:", err);
    }
  };

  const getStoredFavItems = async () => {
    try {
      const storedFavs = await AsyncStorage.getItem('favItemIds');
      if (storedFavs !== null) {
        setFavItemIds(JSON.parse(storedFavs));
      }
    } catch (err) {
      console.error("Error loading favorite items:", err);
    }
  };

  const toggleFavItemById = (itemId: string) => {
    setFavItemIds(prevFavIds => 
      prevFavIds.includes(itemId) 
        ? prevFavIds.filter(id => id !== itemId) 
        : [...prevFavIds, itemId]
    );
  };

  const checkIsFavItem = (itemId: string) => {
    return favItemIds.includes(itemId);
  };

  return (
    <FavItemsContext.Provider value={{ favItemIds, toggleFavItemById, checkIsFavItem }}>
      {children}
    </FavItemsContext.Provider>
  );
};

export const useFavItems = () => {
  const context = useContext(FavItemsContext);
  if (!context) throw new Error("useFavItems must be used inside FavItemsProvider");
  return context;
};

export default FavItemsProvider;
