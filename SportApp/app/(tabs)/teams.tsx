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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        fontFamily: 'HammersmithOne_400Regular',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        fontFamily: 'HammersmithOne_400Regular',
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

export default function Teams() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Next Play</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Teams</Text>
                <TextInput style={searchBar.container} placeholder="Search teams..." />
            </View>
        </View>
    );
}

