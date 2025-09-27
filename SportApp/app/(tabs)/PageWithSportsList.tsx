import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFavItems } from "./FavItemsContext";
import { MaterialIcons } from "@expo/vector-icons";

const items = [
 { id: "sport001", name: "Soccer", category: "SPORT" },
  { id: "sport002", name: "Basketball", category: "SPORT" },
  { id: "sport003", name: "Football", category: "SPORT" },
  { id: "sport004", name: "Baseball", category: "SPORT" },
  { id: "sport005", name: "Tennis", category: "SPORT" },
  { id: "sport006", name: "Golf", category: "SPORT" },
  { id: "sport007", name: "Running", category: "SPORT" },
  { id: "sport008", name: "Ice Hockey", category: "SPORT" },
  { id: "sport009", name: "Cricket", category: "SPORT" },
  { id: "sport010", name: "Swimming", category: "SPORT" },

  { id: "team001", name: "Real Madrid", category: "TEAM" },
  { id: "team002", name: "Golden State Warriors", category: "TEAM" },
  { id: "team003", name: "Pittsburgh Steelers", category: "TEAM" },
  { id: "team004", name: "Los Angeles Lakers", category: "TEAM" },
  { id: "team005", name: "New York Yankees", category: "TEAM" },
  { id: "team006", name: "Dallas Cowboys", category: "TEAM" },
  { id: "team007", name: "Manchester United", category: "TEAM" },
  { id: "team008", name: "Chicago Bulls", category: "TEAM" },
  { id: "team009", name: "Miami Dolphins", category: "TEAM" },
  { id: "team010", name: "Boston Celtics", category: "TEAM" },

  { id: "player001", name: "Cristiano Ronaldo", category: "PLAYER" },
  { id: "player002", name: "Steph Curry", category: "PLAYER" },
  { id: "player003", name: "Tom Brady", category: "PLAYER" },
  { id: "player004", name: "Serena Williams", category: "PLAYER" },
  { id: "player005", name: "LeBron James", category: "PLAYER" },
  { id: "player006", name: "Lionel Messi", category: "PLAYER" },
  { id: "player007", name: "Roger Federer", category: "PLAYER" },
  { id: "player008", name: "Usain Bolt", category: "PLAYER" },
  { id: "player009", name: "Michael Jordan", category: "PLAYER" },
  { id: "player010", name: "Megan Rapinoe", category: "PLAYER" },

  { id: "game001", name: "Knicks VS 76ers", category: "GAME" },
  { id: "game002", name: "Steelers VS Vikings", category: "GAME" },
  { id: "game003", name: "Brewers VS Reds", category: "GAME" },
  { id: "game004", name: "Lakers VS Celtics", category: "GAME" },
  { id: "game005", name: "Yankees VS Red Sox", category: "GAME" },
  { id: "game006", name: "Cowboys VS Eagles", category: "GAME" },
  { id: "game007", name: "Manchester United VS Liverpool", category: "GAME" },
  { id: "game008", name: "Warriors VS Spurs", category: "GAME" },
  { id: "game009", name: "Dolphins VS Patriots", category: "GAME" },
  { id: "game010", name: "Bulls VS Heat", category: "GAME" },
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
