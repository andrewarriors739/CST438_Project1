import { View } from "react-native";
import PlayersPage from "../components/players";
import { useNavigation } from "expo-router";

export default function Players() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <PlayersPage navigation={navigation} />
    </View>
  );
}
