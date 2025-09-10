import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "@/database/database";
import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import { FavItemsProvider } from './FavItemsContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    HammersmithOne_400Regular,
  });

  useEffect(() => {
    initDatabase(); 
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavItemsProvider>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: 'Profile',
              title: 'Profile',
            }}
          />
          <Drawer.Screen
            name="FavSportsListPage"
            options={{
              drawerLabel: 'Favorites',
              title: 'Favorite Sports',
            }}
          />
        </Drawer>
      </FavItemsProvider>
    </GestureHandlerRootView>
  );
}
