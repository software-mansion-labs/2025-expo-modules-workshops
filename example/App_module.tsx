import { useEvent } from "expo";
import ExpoModulesWorkshops, {
  useScreenOrientation,
} from "expo-modules-workshops";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const {
  multiply,
  passString,
  passArray,
  passObject,
  passFunction,
  getPromise,
} = ExpoModulesWorkshops;

export default function App() {
  const onEventPayload = useEvent(ExpoModulesWorkshops, "onEvent");
  const orientation = useScreenOrientation();

  useEffect(() => {
    passFunction((value) => console.log(value));
    getPromise("Workshops!").then((data) => console.log(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Orientation:
        <Text style={styles.results}> {orientation}</Text>
      </Text>
      <Text style={styles.text}>
        multiply:
        <Text style={styles.results}> {multiply(3, 7)}</Text>
      </Text>
      <Text style={styles.text}>
        passString:
        <Text style={styles.results}> {passString("Workshops")}</Text>
      </Text>
      <Text style={styles.text}>
        passArray:
        <Text style={styles.results}> [{passArray([1, 2, 3]).join(", ")}]</Text>
      </Text>
      <Text style={styles.text}>
        passObject:
        <Text style={styles.results}>
          {" "}
          {JSON.stringify(passObject({ index: 1, data: "Workshops" })).replace(
            ",",
            ",\n",
          )}
        </Text>
      </Text>
      <Text style={styles.text}>
        onEvent:
        <Text style={styles.results}> {onEventPayload?.data}</Text>
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
