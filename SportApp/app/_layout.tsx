import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from "react";
import { initDatabase } from "@/database/database";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

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