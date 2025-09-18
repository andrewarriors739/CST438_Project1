import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import React, { useState } from 'react';
import { router } from 'expo-router';
import TeamsComponent from '../components/teams';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#05316b',
    },
    header: {
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'HammersmithOne_400Regular',
    },
    contentContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        paddingTop: 10,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 4,
        textAlign: 'center',
        marginTop: 30,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 4,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    buttonText: {
        color: '#05316b',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'HammersmithOne_400Regular',    
    },
});

const searchBar = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '90%',
        gap: 10,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});


export default function Teams() {
    const [searchText, setSearchText] = useState('');

    // Function to format team name for database search
    const formatTeamName = (teamName: string) => {
        return teamName
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            const formattedTeamName = formatTeamName(searchText);
            console.log('Searching for team:', formattedTeamName);
            router.push({
                pathname: '/teamDisplay',
                params: { teamName: formattedTeamName, logo: null }
            });
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Teams</Text>
                <Text style={styles.subtitle}>Discover Your Favorite Teams</Text>
                <View style={searchBar.searchContainer}>
                    <TextInput 
                        style={searchBar.container} 
                        placeholder="Search teams..." 
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSearch}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TeamsComponent searchText={searchText} />
        </View>
    );
}

