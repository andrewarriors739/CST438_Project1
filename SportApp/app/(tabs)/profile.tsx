import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Button title="Log out" onPress={() => router.push('/LoginPage')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
