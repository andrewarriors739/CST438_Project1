import { View } from 'react-native';
import HomePage from '../../components/HomePage'
import { useNavigation } from 'expo-router';


export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <HomePage navigation={navigation}/>
    </View>
  );
}
