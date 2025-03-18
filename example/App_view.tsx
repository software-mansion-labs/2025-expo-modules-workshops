import { ExpoMapView, ExpoMapViewRef } from "expo-modules-workshops";
import { useRef } from "react";
import { View, StyleSheet, Button } from "react-native";

export default function App() {
  const mapRef = useRef<ExpoMapViewRef>(null);

  const handleMoveTo = () => {
    mapRef.current?.moveTo(50.04, 19.96, true);
  };

  const addMarker = (position: { latitude: number; longitude: number }) => {
    mapRef.current?.addMarker(position.latitude, position.longitude);
  };

  return (
    <View style={styles.container}>
      <ExpoMapView
        nativeRef={mapRef}
        style={styles.box}
        mapType="standard"
        onMapPress={(event) => {
          addMarker(event.nativeEvent);
        }}
        cameraCenter={{ latitude: 50.04, longitude: 19.96 }}
      />
      <View style={styles.buttonBar}>
        <Button title="moveTo" onPress={handleMoveTo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  box: {
    width: "100%",
    flex: 1,
  },
  buttonBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
});
