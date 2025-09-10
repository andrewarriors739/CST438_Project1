import React from "react";
import { FlatList, Text, View } from "react-native";
import { useFavItems } from "./FavItemsContext";

const allSportsItems = [
  { id: "s001", name: "Soccer" },
  { id: "s002", name: "Basketball" },
  { id: "s003", name: "Tennis" },
  { id: "s004", name: "Running" },
];

export default function FavSportsListPage() {
  const { favItemIds } = useFavItems();
  const favSports = allSportsItems.filter((sport) => favItemIds.includes(sport.id));

  return (
    <View style={{ flex: 1, padding: 18 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Your Favorite Sports</Text>
      {favSports.length === 0 ? (
        <Text>No favorites yet</Text>
      ) : (
        <FlatList
          data={favSports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 15, borderBottomWidth: 1, borderColor: "#ddd" }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
