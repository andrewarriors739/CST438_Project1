// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }
import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, Button } from 'react-native';

export default function HomePage({ navigation }) {
  const [search, setSearch] = useState('');

  // Add drawer button in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="☰" onPress={() => navigation.openDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>UPCOMING BASKETBALL GAMES</Text>
      <Image
        source={require("../assets/images/upcomingBasketball.png")}
        style={styles.image}
      />

      <Text style={styles.title}>UPCOMING SOCCER GAMES</Text>
      <Image
        source={require("../assets/images/upcomingBasketball.png")}
        style={styles.image}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop:20,
    borderRadius: 8,
    
  },
  image: {
    width:200,
    height:200,
    borderRadius:20,
  },
  title:{
    fontSize:22,
    fontWeight:"bold",
    textAlign:"center",

  },
});
