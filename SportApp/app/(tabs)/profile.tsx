import { useRouter, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavoritePlayers, getFavoriteTeams } from "@/database/database";

export default function ProfilePage() {
  const router = useRouter();
  const [favoritePlayers, setFavoritePlayers] = useState<any[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<any[]>([]);

  const loadFavorites = async () => {
    const userId = await AsyncStorage.getItem("currentUserId");
    if (userId) {
      const players = await getFavoritePlayers(parseInt(userId));
      const teams = await getFavoriteTeams(parseInt(userId));
      setFavoritePlayers(players);
      setFavoriteTeams(teams);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUserId");
    router.push("/LoginPage");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Favorite Players</Text>

        {favoritePlayers.map((player, index) => (
          <View key={index} style={styles.playerItem}>
            {player.image_url && (
              <Image
                source={{ uri: player.image_url }}
                style={styles.playerImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.player_name}</Text>
              <Text style={styles.playerDetail}>Team: {player.team}</Text>
            </View>
          </View>
        ))}

        {favoritePlayers.length === 0 && (
          <Text style={styles.emptyText}>No favorite Players</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Favorite Teams</Text>

        {favoriteTeams.map((team, index) => (
          <View key={index} style={styles.playerItem}>
            {team.team_logo && (
              <Image
                source={{ uri: team.team_logo }}
                style={styles.playerImage}
                resizeMode="contain"
              />
            )}
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{team.team_name}</Text>
            </View>
          </View>
        ))}

        {favoriteTeams.length === 0 && (
          <Text style={styles.emptyText}>No favorite teams</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05316b",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  playerItem: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  playerImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#05316b",
    marginBottom: 5,
  },
  playerDetail: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
