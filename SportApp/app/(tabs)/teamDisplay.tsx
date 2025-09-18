import {View, Text, StyleSheet} from "react-native";
import TeamDisplayComponent from '../../components/teamDisplay';

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
});

export default function TeamDisplay() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Team Details</Text>
                <Text style={styles.subtitle}>Learn More About The Team</Text>
            </View>
            <TeamDisplayComponent />
        </View>
    );
}
