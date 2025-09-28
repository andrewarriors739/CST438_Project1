import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { initDatabase } from '@/database/database';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [db, setDb] = useState(null); 

  //initialize db
  useEffect(() => {
    const prepareDb = async () => {
      const database = await initDatabase();
      setDb(database);
    };
    prepareDb();
  }, []);

  const handleSignUp = async () => {

      //reset the textinput
      setUserName('');
      setUserPassword('');
      setCheckPassword('');


    if (!userName || !userPassword || !checkPassword) { //requirements
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    if (userPassword !== checkPassword) { //matching password
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!db) { //database not working
      Alert.alert('Error', 'Database not ready yet');
      return;
    }

    try {
      await db.runAsync(
        'INSERT INTO users (username, password) VALUES (?, ?);',
        [userName, userPassword]
      );

      const users = await db.getAllAsync('SELECT * FROM users');
  console.log('All users:', users);


      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginPage');
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error:', 'Failed to create account');
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
      {/* go to log in page if successful */}
      <Button title="Sign Up" onPress={handleSignUp} /> 
            <Button  title="BACK" onPress={() => router.push('/LoginPage')} />
    </ScrollView>
  );
}
