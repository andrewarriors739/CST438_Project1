import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFavoritePlayer, isPlayerFavorited} from '../database/database';

export default function PlayersPage({ navigation }) {
    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState([]);
    const [favoritePlayers, setFavoritePlayers] = useState(new Set());    
    
    const getCurrentUserId = async () => {
        const userId = await AsyncStorage.getItem('currentUserId');
        return userId ? parseInt(userId) : 1; 
    };
    
    const fetchPlayers = async () => {
        
        const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        const playersData = data.player || [];
        setPlayers(playersData);
        
        const currentUserId = await getCurrentUserId();
        const favoriteIds = new Set();
        for (const player of playersData) {
            if (player.idPlayer) {
                const isFav = await isPlayerFavorited(player.idPlayer, currentUserId);
                if (isFav) {
                    favoriteIds.add(player.idPlayer);
                }
            }
        }
        setFavoritePlayers(favoriteIds);
    };
    
    const favoritePlayer = async (player) => {
        const playerId = player.idPlayer;
        const currentUserId = await getCurrentUserId();
            
        await addFavoritePlayer(player, currentUserId);
        setFavoritePlayers(prev => new Set(prev).add(playerId));
        console.log('Player added to favorites:', player.strPlayer);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search players..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={fetchPlayers}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            
            {players.length > 0 ? (
                players.map((player, index) => (
                <View key={index} style={styles.playerItem}>
                    {player.strThumb ? (
                        <Image
                            source={{ uri: player.strThumb }}
                            style={styles.playerImage}
                            resizeMode="contain"
                        />
                    ) : null}
                    <View style={styles.playerInfo}>
                        <View style={styles.playerHeader}>
                            <Text style={styles.playerName}>{player.strPlayer}</Text>
                            <TouchableOpacity 
                                style={styles.favoriteButton}
                                onPress={() => favoritePlayer(player)}
                                disabled={favoritePlayers.has(player.idPlayer)}
                            >
                                <Ionicons 
                                    name={favoritePlayers.has(player.idPlayer) ? "heart" : "heart-outline"} 
                                    size={24} 
                                    color={favoritePlayers.has(player.idPlayer) ? "#ff4444" : "#ccc"} 
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.playerDetail}>Team: {
                        player.strTeam?.toLowerCase().includes("retired") ? "Retired" : 
                        player.strTeam?.toLowerCase().includes("free agent") ? "Unemployed" 
                        : player.strTeam}
                        </Text>
                        <Text style={styles.playerDetail}>Position: {player.strPosition}</Text>
                        <Text style={styles.playerDetail}>Sport: {player.strSport}</Text>
                        <Text style={styles.playerDetail}>Nationality: {player.strNationality}</Text>
                    </View>
                </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Search for a player to see their information</Text>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05316b',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    playerItem: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: 120,
    },
    playerImage: {
        width: 80,
        height: 80,
        marginRight: 15,
        borderRadius: 40,
    },
    playerInfo: {
        flex: 1,
    },
    playerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    playerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#05316b',
        marginBottom: 0,
    },
    favoriteButton: {
        padding: 4,
        marginLeft: 8,
    },
    playerDetail: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    emptyState: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
