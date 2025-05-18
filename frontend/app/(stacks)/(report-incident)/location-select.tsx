import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import MapView, { Marker, UrlTile, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useGlobal } from "@/app/context/useGlobal";
import { router } from "expo-router";

export default function App(): JSX.Element {
  const [region, setRegion] = useState<Region | null>(null);
  const { setSelectedCoordinates } = useGlobal();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location access is required to use this feature."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSubmit = async () => {
    if (region) {
      const location = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });

      let name;

      if (location && location[0]) {
        const address = location[0];
        // Alert.alert(
        //   "Location Details",
        //   `${address.street || ""} ${address.city || ""} ${
        //     address.region || ""
        //   }`
        // );
        name = `${address.street || ""} ${address.city || ""} ${
          address.region || ""
        }`;
      }
      setSelectedCoordinates({
        latitude: region.latitude,
        longitude: region.longitude,
        name: name || "Unknown",
      });
      router.back();
      Alert.alert(
        "Pin Location",
        `Latitude: ${region.latitude}, Longitude: ${region.longitude}`
      );
    } else {
      Alert.alert("No Region", "Region data is not available.");
    }
  };

  if (!region) {
    return <View style={styles.container} />; // Show an empty view while loading location
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
