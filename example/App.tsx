import { Text, View, StyleSheet } from "react-native";
// import ExpoModulesWorkshops from 'expo-modules-workshops';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello
        <Text style={styles.results}>👋</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  results: {
    fontFamily: "Courier",
    fontWeight: "normal",
    paddingLeft: 10,
  },
});
