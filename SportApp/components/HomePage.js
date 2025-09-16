
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, Button, ScrollView } from 'react-native';


export default function HomePage({ navigation }) {
  
  const [basketballEvents, setBasketballEvents] = useState([]);
const [soccerEvents, setSoccerEvents] = useState([]);
const [footballEvents, setFootballEvents] = useState([]);
const [baseballEvents, setBaseballEvents] = useState([]);
const [hockeyEvents, setHockeyEvents] = useState([]);


  //fetch api
 useEffect(() => {
  fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4387')  // nba
      .then(res => res.json())
      .then(data => {
        if (data.events) setBasketballEvents(data.events);
      })
      .catch(console.error);



      //premier league
  fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4328') 
      .then(res => res.json())
      .then(data => {
        if (data.events) setSoccerEvents(data.events);
      })
      .catch(console.error);
 

 //nfl
  fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4391') 
      .then(res => res.json())
      .then(data => {
        if (data.events) setFootballEvents(data.events);
      })
      .catch(console.error);

  //hockey      
  fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4380') 
      .then(res => res.json())
      .then(data => {
        if (data.events) setHockeyEvents(data.events);
      })
      .catch(console.error);


      //baseball
       fetch('https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4424') 
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
        <View key={event.idEvent} style={styles.eachEvent}>
          <Text style={styles.eventTitle}>{event.strEvent}</Text>
          <Text>{event.dateEvent} - {event.strTime}</Text>
        </View>
      ))}


      <Text style={styles.title}>Upcoming Soccer Games</Text>
      {soccerEvents.map(event => (
        <View key={event.idEvent} style={styles.eachEvent}>
          <Text style = {styles.eventTitle}>{event.strEvent}</Text>
          <Text>{event.dateEvent} - {event.strTime}</Text>
        </View>
      ))}



      <Text style={styles.title}>Upcoming Football Games</Text>
      {footballEvents.map(event => (
        <View key={event.idEvent} style={styles.eachEvent}>
          <Text style = {styles.eventTitle}>{event.strEvent}</Text>
          <Text>{event.dateEvent} - {event.strTime}</Text>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Baseball Games</Text>
      {baseballEvents.map(event => (
        <View key={event.idEvent} style={styles.eachEvent}>
          <Text style = {styles.eventTitle}>{event.strEvent}</Text>
          <Text>{event.dateEvent} - {event.strTime}</Text>
        </View>
      ))}

      <Text style={styles.title}>Upcoming Hockey Games</Text>
      {hockeyEvents.map(event => (
        <View key={event.idEvent} style={styles.eachEvent}>
          <Text style = {styles.eventTitle}>{event.strEvent}</Text>
          <Text>{event.dateEvent} - {event.strTime}</Text>
        </View>
      ))}


      


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
    fontSize: 20
  },

  eachEvent:{
    marginBottom:10
  },
 
  eachGame:{
   backgroundColor: 'white',
  padding: 10,
  marginVertical: 5,
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  inHeight: 80,
            
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
  width:'100%',
},
modalBackground: {
  flex: 1,                    
  backgroundColor: 'rgba(0,0,0,0.5)', 
  justifyContent: 'center',    
  
  alignItems: 'center',       
},
modalContent: {
  width: '100%',         
  maxWidth: 400,       
  padding: 20,
  backgroundColor: '#093877',
  borderRadius: 10,
  alignItems: 'center', 
  flexDirection: 'column', 
  textAlign:'center',
  

},
modalImagesRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
  marginVertical: 15,
},
modalGameInfo: {
  alignItems: 'center',
  textAlign: 'center',
  fontSize:20,
  fontWeight: 'bold',
  color:'white'
},


modalButton:{
  backgroundColor: 'white',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},

modalButtonText:{
  fontSize: 20,
  color: '#093877',
  fontWeight: 'bold',
}


});
