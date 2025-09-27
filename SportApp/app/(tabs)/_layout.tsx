import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "@/database/database";
import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
//import FavItemsProvider from './FavItemsContext';
import { FavItemsProvider } from "./FavItemsContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
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

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavItemsProvider>
        <Drawer initialRouteName="LoginPage">
          <Drawer.Screen
            name="HomePage"
            options={{ drawerLabel: "Home", title: "Next Play" }}
          />
          <Drawer.Screen
            name="profile"
            options={{ drawerLabel: "Profile", title: "Next Play" }}
          />
          <Drawer.Screen
            name="players"
            options={{ drawerLabel: "Players", title: "Players" }}
          />
          <Drawer.Screen
            name="teams"
            options={{ drawerLabel: "Teams", title: "Next Play" }}
          />
          <Drawer.Screen
            name="teamDisplay"
            options={{ drawerLabel: "Team Display", title: "Next Play" }}
          />
          <Drawer.Screen
            name="FavItemsContext"
            options={{ drawerLabel: "Favorites Context", title: "Fav Context" }}
          />
          <Drawer.Screen
            name="FavSportsListPage"
            options={{ drawerLabel: "Favorite Sports", title: "Favorite Sports" }}
          />
          <Drawer.Screen
            name="PageWithSportsList"
            options={{ drawerLabel: "Sports List", title: "Sports List" }}
          />
          <Drawer.Screen
            name="LoginPage"
            options={{
              drawerLabel: "Login",
              title: "Next Play",
              drawerItemStyle: { height: 0 },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="signUp"
            options={{
              drawerLabel: "Sign Up",
              title: "Sign Up",
              drawerItemStyle: { height: 0 },
              headerShown: false,
            }}
          />
        </Drawer>
      </FavItemsProvider>
    </GestureHandlerRootView>
  );
}
