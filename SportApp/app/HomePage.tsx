// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput } from 'react-native';
// export default function HomeScreen() {
//   const [search, setSearch] = useState('');
//   return (
//     <View style={styles.container}>
      
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//   },
// });

import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useFavItems } from "../app/FavItemsContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const sportsItems = [
  { id: "s001", name: "Soccer" },
  { id: "s002", name: "Basketball" },
  { id: "s003", name: "Tennis" },
  { id: "s004", name: "Running" },
];

export default function Home() {
  const navigation = useNavigation();

  // Favorites hook from context
  const { toggleFavItemById, checkIsFavItem } = useFavItems();

  return (
    <View style={{ flex: 1, padding: 18 }}>
      <FlatList
        data={sportsItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isItemFav = checkIsFavItem(item.id);
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: "#dedede",
              }}
            >
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <TouchableOpacity onPress={() => toggleFavItemById(item.id)}>
                <MaterialIcons
                  name={isItemFav ? "favorite" : "favorite-border"}
                  size={26}
                  color={isItemFav ? "crimson" : "gray"}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
