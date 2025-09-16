import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { initDatabase } from '@/database/database';

export default function SignUp() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [db, setDb] = useState(null); // <-- JS version

  // Initialize database
  useEffect(() => {
    const prepareDb = async () => {
      const database = await initDatabase();
      setDb(database);
    };
    prepareDb();
  }, []);

  const handleSignUp = async () => {
    if (!userName || !userPassword || !checkPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    if (userPassword !== checkPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!db) {
      Alert.alert('Error', 'Database not ready yet');
      return;
    }

    try {
      await db.execAsync(
        'INSERT INTO users (username, password) VALUES (?, ?);',
        [userName, userPassword]
      );
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginPage');
    } catch (error) {
      console.log('DB insert error:', error);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
      <TextInput
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        style={{ marginBottom: 15, borderWidth: 1, padding: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={userPassword}
        onChangeText={setUserPassword}
        secureTextEntry
        style={{ marginBottom: 15, borderWidth: 1, padding: 12 }}
      />
      <TextInput
        placeholder="Confirm Password"
        value={checkPassword}
        onChangeText={setCheckPassword}
        secureTextEntry
        style={{ marginBottom: 15, borderWidth: 1, padding: 12 }}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </ScrollView>
  );
}
