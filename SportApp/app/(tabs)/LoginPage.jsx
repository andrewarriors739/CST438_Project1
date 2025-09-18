import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MyLoginPage() {
  return (
    <View style={myStyles.mainContainer}>
      <View style={myStyles.titleContainer}>
        <Text style={myStyles.titleText}>NEXT PLAY</Text>
      </View>
      
      {/* Login and Sign Up buttons */}
      <View style={myStyles.buttonsContainer}>
        <TouchableOpacity style={myStyles.buttonBox}>
          <Text style={myStyles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={myStyles.buttonBox}>
          <Text style={myStyles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Skip link */}
      <TouchableOpacity style={myStyles.skipContainer}>
        <Text style={myStyles.skipText}>SKIP</Text>
      </TouchableOpacity>
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
});
