import { View } from 'react-native';

import SignUp from '@/components/signUp';

import { useNavigation } from 'expo-router';


export default function signUp() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <SignUp/>
    </View>
  );
}
