import React, { useState } from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';

export default function PlayersPage({ navigation }) {
    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState([]);
    

    const fetchPlayers = async () => {
        
        const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        setPlayers(data.player || []); 
      };
    
    const topSearch = players[0];

    return (
        <View>
            <TextInput
                style={searchBar.container}
                placeholder="Search players..."
                value={search}
                onChangeText={setSearch}
            />
            <Button title="Search" onPress={fetchPlayers} />
        <ScrollView>
        {topSearch ? (
            <View>
            {topSearch.strThumb ? (
                <Image
                source={{ uri: topSearch.strThumb }}
                style={{ width: 200, height: 200, marginBottom: 10 }}
                />
            ) : null}
            <Text>Name: {topSearch.strPlayer}</Text>
            <Text>Team: {topSearch.strTeam}</Text>
            <Text>Position: {topSearch.strPosition}</Text>
            <Text>Sport: {topSearch.strSport}</Text>
            <Text>Nationality: {topSearch.strNationality}</Text>
            <Text>Status: {topSearch.strStatus}</Text>
            </View>
        ) : (
            <Text></Text>
        )}
        </ScrollView>
    </View>
        
    )
}

  
const searchBar = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginTop: 20,
        width: '80%',
        fontSize: 16,
        color: '#333',
    },
    
});
