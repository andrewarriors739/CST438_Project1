import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


type FavItemsContextType = {
  favItemIds: string[]; // List of favorite item IDs
  toggleFavItemById: (itemId: string) => void; // Adds or removes from favorites
  checkIsFavItem: (itemId: string) => boolean; // Checks if item is favorited
};

const FavItemsContext = createContext<FavItemsContextType | undefined>(undefined);

export const FavItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favItemIds, setFavItemIds] = useState<string[]>([]);

  // Loads the favorites from persistent storage on mount
  useEffect(() => {
    getStoredFavItems();
  }, []);

  // Saves favorites to storage whenever the favorites list changes
  useEffect(() => {
    saveFavItemsToStorage();
  }, [favItemIds]);

  // Saves favorites list to AsyncStorage
  const saveFavItemsToStorage = async () => {
    try {
      await AsyncStorage.setItem('favItemIds', JSON.stringify(favItemIds));
    } catch (err) {
      console.error("Error saving favorite items:", err);
    }
  };

  // Retrieves favorites list from AsyncStorage
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

  // Toggles an item in favorites list
  const toggleFavItemById = (itemId: string) => {
    setFavItemIds(prevFavIds => {
      if (prevFavIds.includes(itemId)) {
        return prevFavIds.filter(id => id !== itemId);
      } else {
        return [...prevFavIds, itemId];
      }
    });
  };

  // Checks if an item is a favorite
  const checkIsFavItem = (itemId: string) => {
    return favItemIds.includes(itemId);
  };

  return (
    <FavItemsContext.Provider
      value={{ favItemIds, toggleFavItemById, checkIsFavItem }}
    >
      {children}
    </FavItemsContext.Provider>
  );
};

// Custom hook to access favorites context
export const useFavItems = () => {
  const context = useContext(FavItemsContext);
  if (!context) throw new Error("useFavItems must be used inside FavItemsProvider");
  return context;
};
