import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFavItems } from "./FavItemsContext";
import { MaterialIcons } from "@expo/vector-icons";

const items = [
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

export default function PageWithSportsList() {
  const { toggleFavItemById, checkIsFavItem } = useFavItems();

  return (
    <View style={{ flex: 1, padding: 18 }}>
      <FlatList
        data={items}
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
              <Text style={{ fontSize: 18 }}>
                [{item.category}] {item.name}
              </Text>
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
