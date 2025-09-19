import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDatabase } from '@/database/database';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyLoginPage() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [db, setDb] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const prepareDb = async () => {
      const database = await initDatabase();
      setDb(database);
    };
    prepareDb();
  }, []);


  const handleLogin = async () => {

    //reset the textinput
    setUserName('');
    setUserPassword('');


    if (!userName || !userPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
  
    if (!db) {
      Alert.alert('Error', 'Database not ready yet');
      return;
    }
  
    try {
      //find the user in the database
      const rows = await db.getAllAsync(
        `SELECT * FROM users WHERE username = '${userName}' AND password = '${userPassword}'`
      );
  
      console.log('Query result:', rows);
  
      if (rows.length > 0) {
        Alert.alert('Success', 'Login successful!');
        setModalVisible(false);
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to login');
    }
  };
  
  
  MyLoginPage.options = {
    headerShown: false, // hides the navigation bar
  };


  return (
    <View style={myStyles.mainContainer}>
      <View style={myStyles.titleContainer}>
        <Text style={myStyles.titleText}>NEXT PLAY</Text>
      </View>
      
      {/* Login and Sign Up buttons */}
      <View style={myStyles.buttonsContainer}>
        <TouchableOpacity style={myStyles.buttonBox}>
          <Button style={myStyles.buttonText} title = "LOGIN" onPress={() => setModalVisible(true)} />
      
        </TouchableOpacity>

         
        <TouchableOpacity style={myStyles.buttonBox}>
          {/* <Text style={myStyles.buttonText}>SIGN UP</Text> */}
          <Button style = {myStyles.buttonText}  title = "SIGN UP" onPress={() => navigation.navigate('signUp')}
 />
        </TouchableOpacity>
      </View>

      {/* Skip link
      <TouchableOpacity style={myStyles.skipContainer}>
        <Text style={myStyles.skipText}>SKIP</Text>
      </TouchableOpacity> */}

      <Modal
          visible={modalVisible}
          animationType = 'fade'
          transparent={true}
          onRequestClose={ () => setModalVisible(false)}
        
        >
        <View style = {myStyles.modalBackground}>
        <View style = {myStyles.modalContent}>
          <Text style = {myStyles.modalTitle}>LOGIN
         
          </Text>

          <TextInput
          placeholder='Username'
          value = {userName}
          onChangeText={setUserName}
          style={myStyles.modalText}
      />
      <TextInput
        placeholder ="Password"
        value = {userPassword}
        onChangeText = {setUserPassword}
        style={myStyles.modalText}
        secureTextEntry
        />
<View style = {myStyles.modalButtons}>
    <Button title = "Login" onPress={handleLogin}/>
    <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
    
</View>
    </View>

  </Modal>



</View>

  );

}

const myStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#093877',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: screenHeight * 0.27,
    alignSelf: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonsContainer: {
    position: 'absolute',
    top: screenHeight * 0.4,
    width: '100%',
    alignItems: 'center',
  },
  buttonBox: {
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 3,
  },
  skipContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 3,
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
  modalText:
  {
    marginBottom: 15, 
    borderWidth: 1, 
    padding: 12,
    borderRadius: 10,
    width:'100%'
  },
  modalTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  }
});
