import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRouter } from "expo-router";
import { baseURL } from "@/constants/url";
import { useGlobal } from "../../context/useGlobal";
import { LinearGradient } from "expo-linear-gradient";

export default function IncidentReport() {
  const [incidentType, setIncidentType] = useState("");
  const [customType, setCustomType] = useState("");
  const [description, setDescription] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [role, setRole] = useState("user"); // Role selection

  const router = useRouter();
  const { setSelectedCoordinates, selectedCoordinates, userData } = useGlobal();

  const handleIncidentTypeChange = (value: any) => {
    setIncidentType(value);
    setShowCustomInput(value === "Other");
  };

  const handleLocationPress = () => {
    // Navigate to map view to select location
    router.push("/(stacks)/(report-incident)/location-select");
  };

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to upload images.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });
      if (!result.canceled) {
        setSelectedImages([...selectedImages, ...result.assets]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };

  const handleSubmitReport = async () => {
    try {
      // Convert images to base64 if any images were selected
      const imagePromises = selectedImages.map(async (image) => {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result?.toString().split(",")[1];
            resolve(base64data);
          };
          reader.readAsDataURL(blob);
        });
      });
      const base64Images = await Promise.all(imagePromises);

      // Build the payload for the report incident.
      const payload = {
        type: incidentType === "Other" ? customType : incidentType,
        datetime: new Date().toISOString(),
        location: selectedCoordinates?.name || location,
        latitude: selectedCoordinates?.latitude,
        longitude: selectedCoordinates?.longitude,
        description: description,
        images: base64Images,
        status: "pending",
        userId: userData ? userData.id : 1,
        role, // Include selected role
      };

      console.log(payload);

      // Submit the incident report to the backend
      const incidentResponse = await axios.post(`${baseURL}/report-incident`, payload);
      Alert.alert("Success", "Incident reported successfully!");
      console.log(incidentResponse.data);

      // Create a notification for the new incident
      const notificationPayload = {
        message: "New incident reported:" + payload.type,
        isRead: false,
        incidentId: incidentResponse.data.id,
        userId: userData ? userData.id : 1,
      };
      console.log(notificationPayload);
      await axios.post(`${baseURL}/notifications`, notificationPayload);

      // Clear form values
      setIncidentType("");
      setCustomType("");
      setDescription("");
      setSelectedImages([]);
      setSelectedCoordinates(null);
      setShowCustomInput(false);

      router.replace("/(stacks)/");
    } catch (err: any) {
      Alert.alert("Error", `${err}`);
      console.error(err);
    }
  };

  const handleGoBack = () => {
    router.push("/(stacks)/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report an Incident</Text>

      <Text style={styles.label}>Type of Incident</Text>
      <Picker
        selectedValue={incidentType}
        style={styles.picker}
        onValueChange={handleIncidentTypeChange}
      >
        <Picker.Item label="Select an incident type" value="" />
        <Picker.Item label="Accident" value="Accident" />
        <Picker.Item label="Theft" value="Theft" />
        <Picker.Item label="Vandalism" value="Vandalism" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      {showCustomInput && (
        <TextInput
          placeholder="Specify other type"
          style={styles.input}
          placeholderTextColor="#777"
          value={customType}
          onChangeText={setCustomType}
        />
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor="#777"
        style={styles.input}
        multiline
      />

      <View>
        <Text style={styles.label}>Location</Text>
        {selectedCoordinates ? (
          <View style={styles.locationDisplay}>
            <Text style={styles.locationText}>
              Selected Location: {selectedCoordinates.name || "Unknown Area"}
            </Text>
            <Text style={styles.coordinatesText}>
              Lat: {selectedCoordinates.latitude.toFixed(6)}, Long:{" "}
              {selectedCoordinates.longitude.toFixed(6)}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationPress}
          >
            <Text style={styles.locationButtonText}>
              {location || "Select Location"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.imageSection}>
        <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Upload Images</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.imageGrid}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.thumbnail} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setSelectedImages(selectedImages.filter((_, i) => i !== index));
                }}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Role Selection */}
      <View style={styles.rolePickerContainer}>
        <Text style={styles.label}>Select Role</Text>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

      {/* Submit Report Button with Gradient */}
      <TouchableOpacity style={styles.button} onPress={handleSubmitReport}>
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Submit Report</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Go Back Button with Gradient */}
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientButton}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111", // Black background
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#444",
    fontSize: 16,
    color: "#fff",
  },
  locationDisplay: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 14,
    color: "#aaa",
  },
  locationButton: {
    borderWidth: 1,
    borderColor: "#00A651",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#111",
  },
  locationButtonText: {
    color: "#00A651",
    fontSize: 16,
  },
  imageSection: {
    marginTop: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageContainer: {
    position: "relative",
    margin: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
  },
  rolePickerContainer: {
    marginTop: 20,
  },
  goBackButton: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    width: "50%",
  },
  goBackButtonText: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});