import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';


//API Calls to get random teams that have events happening soon to show up on the teams page
export default function Teams({ searchText }) {
    const [basketballTeam, setBasketballTeam] = useState([]);
    const [soccerTeam, setSoccerTeam] = useState([]);
    const [footballTeam, setFootballTeam] = useState([]);
    const [baseballTeam, setBaseballTeam] = useState([]);
    const [hockeyTeam, setHockeyTeam] = useState([]);

    
    const teamClicked = (team) => {
        router.push({
            pathname: '/teamDisplay',
            params: { teamName: team.name, logo: team.logo }
        });
    };

    // Get home teams from events
    const extractHomeTeam = (events) => {
        if (!events || !Array.isArray(events)) return [];
        return events.map(event => ({
            id: event.idHomeTeam,
            name: event.strHomeTeam,
            logo: event.strHomeTeamBadge,
            loading: false
        }));
    };



    useEffect(() => {
        //Getting Basketball Teams
        fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4387')  
            .then(res => res.json())
            .then(data => {
                const teams = extractHomeTeam(data.events);
                setBasketballTeam(teams);
            })
            .catch(console.error);

        //Getting Soccer Teams
        fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328')  
            .then(res => res.json())
            .then(data => {
                const teams = extractHomeTeam(data.events);
                setSoccerTeam(teams);
            })
            .catch(console.error);

        //Getting Football Teams
        fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4391')  
            .then(res => res.json())
            .then(data => {
                const teams = extractHomeTeam(data.events);
                setFootballTeam(teams);
            })
            .catch(console.error);

        //Getting Baseball Teams
        fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4424')  
            .then(res => res.json())
            .then(data => {
                const teams = extractHomeTeam(data.events);
                setBaseballTeam(teams);
            })
            .catch(console.error);

        //Getting Hockey Teams
        fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4380')  
            .then(res => res.json())
            .then(data => {
                const teams = extractHomeTeam(data.events);
                setHockeyTeam(teams);
            })
            .catch(console.error);
    }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#05316b',
            padding: 20,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20,
            marginBottom: 10,
        },
        teamItem: {
            backgroundColor: 'white',
            padding: 15,
            marginVertical: 5,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 80,
        },
        teamLogo: {
            width: 50,
            height: 50,
            marginRight: 15,
            borderRadius: 25,
        },
        teamBanner: {
            width: 80,
            height: 40,
            marginRight: 15,
            borderRadius: 5,
        },
        teamName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#05316b',
            marginBottom: 4,
        },
        selectedTeam: {
            backgroundColor: '#4CAF50',
        },
        selectedTeamText: {
            color: 'white',
        },
        loadingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        loadingText: {
            color: 'white',
            marginLeft: 10,
        }
    });

    

    return (
        <ScrollView style={styles.container}>
            {basketballTeam.map(team => (
                <TouchableOpacity 
                    key={team.id} 
                    style={styles.teamItem}
                    onPress={() => teamClicked(team)}
                >
                    {team.logo && (
                        <Image 
                            source={{ uri: team.logo }} 
                            style={styles.teamLogo}
                            resizeMode="contain"
                            testID={`team-logo-${team.id}`}
                        />
                    )}
                    <Text style={styles.teamName}>{team.name}</Text>
                </TouchableOpacity>
            ))}

            {soccerTeam.map(team => (
                <TouchableOpacity 
                    key={team.id} 
                    style={styles.teamItem}
                    onPress={() => teamClicked(team)}
                >
                    {team.logo && (
                        <Image 
                            source={{ uri: team.logo }} 
                            style={styles.teamLogo}
                            resizeMode="contain"
                            testID={`team-logo-${team.id}`}
                        />
                    )}
                    <Text style={styles.teamName}>{team.name}</Text>
                </TouchableOpacity>
            ))}

            {footballTeam.map(team => (
                <TouchableOpacity 
                    key={team.id} 
                    style={styles.teamItem}
                    onPress={() => teamClicked(team)}
                >
                    {team.logo && (
                        <Image 
                            source={{ uri: team.logo }} 
                            style={styles.teamLogo}
                            resizeMode="contain"
                            testID={`team-logo-${team.id}`}
                        />
                    )}
                    <Text style={styles.teamName}>{team.name}</Text>
                </TouchableOpacity>
            ))}

            {baseballTeam.map(team => (
                <TouchableOpacity 
                    key={team.id} 
                    style={styles.teamItem}
                    onPress={() => teamClicked(team)}
                >
                    {team.logo && (
                        <Image 
                            source={{ uri: team.logo }} 
                            style={styles.teamLogo}
                            resizeMode="contain"
                            testID={`team-logo-${team.id}`}
                        />
                    )}
                    <Text style={styles.teamName}>{team.name}</Text>
                </TouchableOpacity>
            ))}

            {hockeyTeam.map(team => (
                <TouchableOpacity 
                    key={team.id} 
                    style={styles.teamItem}
                    onPress={() => teamClicked(team)}
                >
                    {team.logo && (
                        <Image 
                            source={{ uri: team.logo }} 
                            style={styles.teamLogo}
                            resizeMode="contain"
                            testID={`team-logo-${team.id}`}
                        />
                    )}
                    <Text style={styles.teamName}>{team.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}