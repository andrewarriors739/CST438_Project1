// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput } from 'react-native';

// export default function HomeScreen() {
//   const [search, setSearch] = useState('');

//   return (
//     <View style={styles.container}>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//   },
// });
import { View } from 'react-native';
import HomePage from '@/components/HomePage'
import { useNavigation } from 'expo-router';


export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <HomePage navigation={navigation}/>
    </View>
  );
}
