import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFavoriteTeam } from '../database/database';

export default function TeamDisplayComponent() {
    const { teamName, logo } = useLocalSearchParams();
    const [teamDescription, setTeamDescription] = useState('');
    const [teamLocation, setTeamLocation] = useState('');
    const [teamStadium, setTeamStadium] = useState('');
    const [teamLeague, setTeamLeague] = useState('');
    const [yearMade, setYearMade] = useState('');
    const [teamLogo, setTeamLogo] = useState('');
    const [loading, setLoading] = useState(true);
    const [teamNotFound, setTeamNotFound] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    

    useEffect(() => {
        if (teamName) {
            const actualTeamName = Array.isArray(teamName) ? teamName[0] : teamName;
            
            setIsFavorited(false);
            
            fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${actualTeamName}`)
                .then(res => res.json())
                .then(data => {
                    if (data.teams && data.teams[0]) {
                        setTeamDescription(data.teams[0].strDescriptionEN || 'No description available');
                        setTeamLocation(data.teams[0].strCountry || 'Unknown location');
                        setTeamStadium(data.teams[0].strStadium || 'Unknown stadium');
                        setTeamLeague(data.teams[0].strLeague || 'Unknown league');
                        setYearMade(data.teams[0].intFormedYear || 'Unknown year');
                        setTeamLogo(data.teams[0].strBadge || data.teams[0].strLogo || null);
                        setTeamNotFound(false);
                    } else {
                        setTeamNotFound(true);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching team details:', error);
                    setLoading(false);
                });
        }
    }, [teamName]);

    const getCurrentUserId = async () => {
        const userId = await AsyncStorage.getItem('currentUserId');
        return userId ? parseInt(userId) : null;
    };

    const favoriteTeam = async () => {
        const currentUserId = await getCurrentUserId();
    
        const team = {
            id: teamName,
            name: teamName,
            logo: teamLogo || logo
        };
            
        await addFavoriteTeam(team, currentUserId);
        setIsFavorited(true);
        console.log('Team added to favorites:', teamName);
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: '#05316b',
        },
        contentContainer: {
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20,
            paddingTop: 10,
        },
        teamHeader: {
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
        },
        logo: {
            width: 120,
            height: 120,
            marginVertical: 20,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: 'white',
            backgroundColor: 'white',
        },
        teamName: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 20,
        },
        backButton: {
            position: 'absolute',
            bottom: 30,
            right: 20,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        favoritesButton: {
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
        },
        backButtonText: {
            color: '#05316b',
            fontSize: 16,
            fontWeight: 'bold',
        },
        detailItem: {
            padding: 15,
            marginVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        },
        detailLabel: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        detailValue: {
            color: 'white',
            fontSize: 16,
            lineHeight: 22,
        },
        loadingText: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 20,
        },
        notFoundContainer: {
            alignItems: 'center',
            marginTop: 50,
            padding: 20,
        },
        notFoundText: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        notFoundSubtext: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
        },
    });

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.teamHeader}>
                    {(teamLogo || logo) ? (
                        <Image 
                            source={{ uri: teamLogo || (Array.isArray(logo) ? logo[0] : logo) }} 
                            style={styles.logo}
                            resizeMode="contain"
                            onError={() => console.log('Failed to load team badge')}
                        />
                    ) : (
                        <View style={[styles.logo, { backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ color: 'white', fontSize: 16 }}>No Logo</Text>
                        </View>
                    )}

                   
                    <Text style={styles.teamName}>
                        {teamName ? (Array.isArray(teamName) ? teamName[0] : teamName) : 'Team Name Not Available'}
                    </Text>
                </View>
                
                
                {loading ? (
                    <Text style={styles.loadingText}>Loading team details...</Text>
                ) : teamNotFound ? (
                    <View style={styles.notFoundContainer}>
                        <Text style={styles.notFoundText}>Team Not Found</Text>
                        <Text style={styles.notFoundSubtext}>
                            Sorry, we couldn't find detailed information for this team.{'\n'}
                            The team may not be available in our database.
                        </Text>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity 
                            style={[styles.favoritesButton, isFavorited && { backgroundColor: '#4CAF50' }]}
                            onPress={favoriteTeam}
                            disabled={isFavorited}
                        >
                            <Text style={[styles.backButtonText, isFavorited && { color: 'white' }]}>
                                {isFavorited ? 'Added to Favorites!' : 'Add to Favorites'}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>League:</Text>
                                <Text style={styles.detailValue}>{teamLeague}</Text>
                            </View>
                            
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Location:</Text>
                                <Text style={styles.detailValue}>{teamLocation}</Text>
                            </View>
                            
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Stadium:</Text>
                                <Text style={styles.detailValue}>{teamStadium}</Text>
                            </View>
                            
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Founded:</Text>
                                <Text style={styles.detailValue}>{yearMade}</Text>
                            </View>
                            
                            {teamDescription && (
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Description:</Text>
                                    <Text style={styles.detailValue}>{teamDescription}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
                
                <View style={{ height: 60 }} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/teams')}
                >
                    <Text style={styles.backButtonText}>← Back to Search</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}