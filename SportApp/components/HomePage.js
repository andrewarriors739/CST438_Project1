import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';

export default function HomePage({ navigation }) {

  const [basketballEvents, setBasketballEvents] = useState([]);
  const [soccerEvents, setSoccerEvents] = useState([]);
  const [footballEvents, setFootballEvents] = useState([]);
  const [baseballEvents, setBaseballEvents] = useState([]);
  const [hockeyEvents, setHockeyEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //fetch api
  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4387')  // nba
      .then(res => res.json())
      .then(data => {
        if (data.events) setBasketballEvents(data.events);
      })
      .catch(console.error);

    fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328') // premier league
      .then(res => res.json())
      .then(data => {
        if (data.events) setSoccerEvents(data.events);
      })
      .catch(console.error);

    fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4391') // nfl
      .then(res => res.json())
      .then(data => {
        if (data.events) setFootballEvents(data.events);
      })
      .catch(console.error);

    fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4380') // hockey
      .then(res => res.json())
      .then(data => {
        if (data.events) setHockeyEvents(data.events);
      })
      .catch(console.error);

    fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4424') // baseball
      .then(res => res.json())
      .then(data => {
        if (data.events) setBaseballEvents(data.events);
      })
      .catch(console.error);

  }, []);

  // Add drawer button in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="☰" onPress={() => navigation.openDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upcoming Basketball Games</Text>
      {basketballEvents.map(event => (
        <View key={event.idEvent} style={styles.eachGame}>
          <TouchableOpacity onPress={() => { setSelectedEvent(event); setModalVisible(true); }} style={styles.row}>
            <Image 
              source={{ uri: event.strHomeTeamBadge }} 
              style={{ width: 50, height: 50 }} 
            />
            <Text>{event.dateEvent + '\n' + event.strTime}</Text>
            <Image 
              source={{ uri: event.strAwayTeamBadge }} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Soccer Games</Text>
      {soccerEvents.map(event => (
        <View key={event.idEvent} style={styles.eachGame}>
          <TouchableOpacity onPress={() => { setSelectedEvent(event); setModalVisible(true); }} style={styles.row}>
            <Image 
              source={{ uri: event.strHomeTeamBadge }} 
              style={{ width: 50, height: 50 }} 
            />
            <Text>{event.dateEvent + '\n' + event.strTime}</Text>
            <Image 
              source={{ uri: event.strAwayTeamBadge }} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Football Games</Text>
      {footballEvents.map(event => (
        <View key={event.idEvent} style={styles.eachGame}>
          <TouchableOpacity onPress={() => { setSelectedEvent(event); setModalVisible(true); }} style={styles.row}>
            <Image 
              source={{ uri: event.strHomeTeamBadge }} 
              style={{ width: 50, height: 50 }} 
            />
            <Text>{event.dateEvent + '\n' + event.strTime}</Text>
            <Image 
              source={{ uri: event.strAwayTeamBadge }} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Baseball Games</Text>
      {baseballEvents.map(event => (
        <View key={event.idEvent} style={styles.eachGame}>
          <TouchableOpacity onPress={() => { setSelectedEvent(event); setModalVisible(true); }} style={styles.row}>
            <Image 
              source={{ uri: event.strHomeTeamBadge }} 
              style={{ width: 50, height: 50 }} 
            />
            <Text>{event.dateEvent + '\n' + event.strTime}</Text>
            <Image 
              source={{ uri: event.strAwayTeamBadge }} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Hockey Games</Text>
      {hockeyEvents.map(event => (
        <View key={event.idEvent} style={styles.eachGame}>
          <TouchableOpacity onPress={() => { setSelectedEvent(event); setModalVisible(true); }} style={styles.row}>
            <Image 
              source={{ uri: event.strHomeTeamBadge }} 
              style={{ width: 50, height: 50 }} 
            />
            <Text>{event.dateEvent + '\n' + event.strTime}</Text>
            <Image 
              source={{ uri: event.strAwayTeamBadge }} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      ))}

     
     {/* modal section, same modal for different games */}
      {selectedEvent && (
          <Modal 
            visible={modalVisible} 
            transparent={true} 
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContent, { padding: 15, 
              borderWidth: 2 }]}>
     
      {selectedEvent && (
        <>
         
          <View style={[styles.row, { 
            justifyContent: 'space-around', 
            marginVertical: 10 }]}>
            <Image 
              source={{ uri: selectedEvent.strHomeTeamBadge }} 
              style={{ width: 60, height: 60 }} 
            />
            <Text style={[styles.eventTitle, { textAlign: 'center',
               flexShrink: 1 }]}>
              {selectedEvent.strEvent}
            </Text>
            <Image 
              source={{ uri: selectedEvent.strAwayTeamBadge }} 
              style={{ width: 60, height: 60 }} 
            />
          </View>

        
          <Text style={{ fontSize: 16, marginVertical: 10 }}>
            {selectedEvent.dateEvent} - {selectedEvent.strTime}
          </Text>

    
          <View style={[styles.modalGameInfo, { borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.2)', marginTop: 10, paddingTop: 10 }]}>
            <Text style={{ fontSize: 16 }}>Score: 0 - 0</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </>
      )}
    </View>
  </View>
</Modal>


      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },

  title:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center",
    backgroundColor: '#093877',
    color: "white",
    marginBottom:15
  },
  eventTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent:'space-between'
  },
  eachEvent:{
    marginBottom:10,
  },
  eachGame:{
    alignItems:'center',
    flexDirection:'row',
    marginBottom:10,
    borderWidth:5,
    justifyContent:'space-between',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 2,
    width:'100%',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5, 
  },

  modalBackground: {
    flex: 1,                    
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',    
    alignItems: 'center',       
  },
  modalContent: {
    width: '80%',        
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center', 
    flexDirection: 'column', 
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  modalGameInfo: {
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
    marginTop: 10,
    paddingTop: 10,
  }
});
