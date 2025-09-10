import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { router } from 'expo-router';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#05316b',
    },
    header: {
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'HammersmithOne_400Regular',
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        paddingTop: 10,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 4,
        textAlign: 'center',
        marginTop: 30,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 4,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#05316b',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'HammersmithOne_400Regular',    
    },
});

const searchBar = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginTop: 20,
        width: '80%',
        fontSize: 16,
        color: '#333',
    },
    
});

const teamAPICall ="https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t="


export default function Teams() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Teams</Text>
                <TextInput style={searchBar.container} placeholder="Search teams..." />
            </View>

            {/* <img src="" alt="" /> */}
        </View>
    );
}

