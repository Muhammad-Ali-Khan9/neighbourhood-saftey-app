import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, {
  Marker,
  Callout,
  Region,
  UrlTile as RNMUrlTile,
} from "react-native-maps";
import { Text as RNText } from "react-native";
import axios from "axios";
import { baseURL } from "@/constants/url";

// Cast UrlTile to any for type compatibility
const UrlTile: any = RNMUrlTile;

interface IncidentData {
  id: number;
  type: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  imageUrl?: string; // Can be a comma-separated string if multiple images exist
}

export default function IncidentMap() {
  const [incidentData, setIncidentData] = useState<IncidentData[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<IncidentData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}/report-incident`);
        console.log("Fetched incidents:", response.data);
        setIncidentData(response.data);
      } catch (err: any) {
        Alert.alert("Error", `Unable to fetch incidents: ${err}`);
      }
    };

    getData();
    // Set an initial region for the map
    setRegion({
      latitude: 33.6847211030862,
      longitude: 73.0442043207585,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

  // When the callout is pressed, set the selected incident to display details.
  const handleCalloutPress = (incident: IncidentData) => {
    setSelectedIncident(incident);
  };

  // Helper function to render images from the incident's imageUrl field.
  const renderIncidentImages = (incident: IncidentData) => {
    if (!incident.imageUrl || incident.imageUrl.trim() === "") return null;
    let urls: string[] = [];
    if (incident.imageUrl.includes(",")) {
      urls = incident.imageUrl.split(",").map((u) => u.trim()).filter((u) => u !== "");
    } else {
      urls = [incident.imageUrl.trim()];
    }
    return (
      <ScrollView horizontal style={styles.detailImageScroll}>
        {urls.map((url: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: url }}
            style={styles.detailImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    );
  };

  if (!region) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />
        {incidentData.map((incident) => {
          const lat = Number(incident.latitude);
          const lng = Number(incident.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;
          return (
            <Marker
              key={incident.id}
              coordinate={{ latitude: lat, longitude: lng }}
              title={incident.type || incident.location}
              description={incident.description}
            >
              <Callout onPress={() => handleCalloutPress(incident)}>
                <View style={styles.calloutContainer}>
                  <RNText style={styles.calloutTitle}>
                    {incident.type || incident.location}
                  </RNText>
                  <RNText style={styles.calloutDescription}>
                    {incident.description}
                  </RNText>
                  <RNText style={styles.calloutButtonText}>View Details</RNText>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* Detail Overlay Box */}
      {selectedIncident && (
        <View style={styles.detailBox}>
          <ScrollView>
            <RNText style={styles.detailTitle}>
              {selectedIncident.type || selectedIncident.location}
            </RNText>
            <RNText style={styles.detailDescription}>
              {selectedIncident.description}
            </RNText>
            {renderIncidentImages(selectedIncident)}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedIncident(null)}
          >
            <RNText style={styles.closeButtonText}>Close</RNText>
          </TouchableOpacity>
        </View>
      )}
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
  calloutContainer: {
    width: 250,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  calloutButtonText: {
    fontSize: 14,
    color: "#21D4FD",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  detailBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    maxHeight: "50%",
    elevation: 5,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailImageScroll: {
    marginTop: 10,
  },
  detailImage: {
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#FF5F6D",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});