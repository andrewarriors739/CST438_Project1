import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useFavItems } from "../app/FavItemsContext";
import { MaterialIcons } from "@expo/vector-icons";

interface Sport {
  idSport: string;
  strSport: string;
}

interface League {
  idLeague: string;
  strLeague: string;
}

interface Player {
  idPlayer: string;
  strPlayer: string;
}

interface GameEvent {
  idEvent: string;
  strEvent: string;
}

interface Item {
  id: string;
  name: string;
  type: "sport" | "league" | "player" | "game";
}

export default function PageWithMixedFeed() {
  const { toggleFavItemById, checkIsFavItem } = useFavItems();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sports categories
        const sportsRes = await fetch("https://www.thesportsdb.com/api/v1/json/123/all_sports.php");
        const sportsData = await sportsRes.json();
        const sportItems: Item[] = (sportsData.sports ?? [])
          .slice(0, 3) 
          .map((s: Sport) => ({
            id: s.idSport,
            name: s.strSport,
            type: "sport",
          }));

        // Popular leagues
        const leaguesRes = await fetch("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php");
        const leaguesData = await leaguesRes.json();
        const leagueItems: Item[] = (leaguesData.leagues ?? [])
          .slice(0, 3)
          .map((l: League) => ({
            id: l.idLeague,
            name: l.strLeague,
            type: "league",
          }));

        // Top players 
        const famousPlayers = ["Messi", "Ronaldo", "Steph Curry"];
        const playerPromises = famousPlayers.map(async (name) => {
          const res = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${name}`);
          const data = await res.json();
          const players = (data.player ?? []).map((p: Player) => ({
            id: p.idPlayer,
            name: p.strPlayer,
            type: "player",
          }));
          return players[0] ? [players[0]] : []; // take top result or empty
        });
        const playersNested = await Promise.all(playerPromises);
        const playerItems = playersNested.flat();

        // Upcoming games/events from a popular league
        const gamesRes = await fetch("https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328");
        const gamesData = await gamesRes.json();
        const gameItems: Item[] = (gamesData.events ?? [])
          .slice(0, 3) // top 3 upcoming
          .map((e: GameEvent) => ({
            id: e.idEvent,
            name: e.strEvent,
            type: "game",
          }));

        const combined = [...sportItems, ...leagueItems, ...playerItems, ...gameItems];
        // Shuffle
        const shuffled = combined.sort(() => 0.5 - Math.random());

        setItems(shuffled);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 18 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFav = checkIsFavItem(item.id);
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
                [{item.type.toUpperCase()}] {item.name}
              </Text>
              <TouchableOpacity onPress={() => toggleFavItemById(item.id)}>
                <MaterialIcons name={isFav ? "favorite" : "favorite-border"} size={26} color={isFav ? "crimson" : "gray"} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
