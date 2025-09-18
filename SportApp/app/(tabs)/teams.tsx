import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import TeamsComponent from '../../components/teams';

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
        marginBottom: 10,
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
        marginTop: 10,
        width: '80%',
    },
});


export default function Teams() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Teams</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Teams</Text>
                <Text style={styles.subtitle}>Discover Your Favorite Teams</Text>
                <TextInput 
                    style={[searchBar.container, { fontSize: 16, color: '#333' }]} 
                    placeholder="Search teams..." 
                />
            </View>
            <TeamsComponent />
        </View>
    );
}

