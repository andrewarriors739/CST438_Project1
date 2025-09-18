import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "@/database/database";
import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import { FavItemsProvider } from '../FavItemsContext';


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
            options={{ 
              drawerLabel: "Team Display", 
              title: "Next Play"
            }}
          />
          <Drawer.Screen
            name="LoginPage"
            options={{
              drawerLabel: "Login",
              title: "Next Play"
            }}
          />
          <Drawer.Screen
            name="signUp"
            options={{ drawerLabel: "Sign Up", title: "Sign Up" }}
          />
        </Drawer>
      </FavItemsProvider>
    </GestureHandlerRootView>
  );
}
