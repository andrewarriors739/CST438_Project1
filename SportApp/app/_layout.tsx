import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initDatabase } from "@/database/database";

import { HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';

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
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
        name = "profile"
        options = {{
          drawerLabel: 'Profile', 
          title: 'Profile',
        }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}