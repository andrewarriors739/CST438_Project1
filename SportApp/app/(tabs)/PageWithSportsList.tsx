import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
//import { useFavItems } from "../app/FavItemsContext";
import { useFavItems } from "./FavItemsContext";
import { MaterialIcons } from "@expo/vector-icons";

// Sample data list of sports, can be changed later
const sportsItems = [
  { id: "s001", name: "Soccer" },
  { id: "s002", name: "Basketball" },
  { id: "s003", name: "Tennis" },
  { id: "s004", name: "Running" },
];

export default function PageWithSportsList() {
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
                {/* Heart icon filled if favorite, outlined otherwise */}
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