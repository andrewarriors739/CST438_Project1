import React from "react";
import { FlatList, Text, View } from "react-native";
import { useFavItems } from "./FavItemsContext";

const allItems = [
  { id: "sport001", name: "Soccer", category: "SPORT" },
  { id: "sport002", name: "Basketball", category: "SPORT" },
  { id: "sport003", name: "Football", category: "SPORT" },
  { id: "team001", name: "Real Madrid", category: "TEAM" },
  { id: "team002", name: "Warriors", category: "TEAM" },
  { id: "team003", name: "Steelers", category: "TEAM" },
  { id: "player001", name: "Christiano Ronaldo", category: "PLAYER" },
  { id: "player002", name: "Steph Curry", category: "PLAYER" },
  { id: "player003", name: "Tom Brady", category: "PLAYER" },
  { id: "game001", name: "Knicks VS 76ers", category: "GAME" },
  { id: "game002", name: "Steelers VS Vikings", category: "GAME" },
  { id: "game003", name: "Brewers VS Reds", category: "GAME" },
];

export default function FavSportsListPage() {
  const { favItemIds } = useFavItems();

  const favItems = allItems.filter(item => favItemIds.includes(item.id));

  return (
    <View style={{ flex: 1, padding: 18 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Your Favorite Items</Text>
      {favItems.length === 0 ? (
        <Text>No favorites yet</Text>
      ) : (
        <FlatList
          data={favItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 15, borderBottomWidth: 1, borderColor: "#ddd" }}>
              <Text style={{ fontSize: 18 }}>
                [{item.category}] {item.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
