import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import { useGlobal } from "../context/useGlobal";
import axios from "axios";
import { baseURL } from "@/constants/url";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function UpdateProfile() {
  const { userData, setUserData } = useGlobal();
  const router = useRouter();

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
    }
  }, [userData]);

  const handleUpdate = async () => {
    if (!userData) {
      Alert.alert("Error", "No user data available.");
      return;
    }
    try {
      const payload = { firstName, lastName, email };
      const response = await axios.patch(`${baseURL}/users/${userData.id}`, payload);
      console.log("Update response:", response.data);
      setUserData(response.data);
      Alert.alert("Success", "Profile updated successfully!");
      router.replace("/profile");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      Alert.alert("Update Error", error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    router.replace("/(auth)/login");
  };

  const handleGoBack = () => {
    router.push("/(stacks)/");
  };

  return (
    <View style={styles.container}>
      {/* Green Top Bar with Rounded Bottom Corners */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Update Profile</Text>
      </View>

      {/* Content Area: Centered Form */}
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#777"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#777"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleUpdate}>
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogout}>
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Go Back Button */}
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleGoBack}>
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Black background
  },
  topBar: {
    backgroundColor: "#00A651",
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowLine: {
    width: 16,
    height: 2,
    backgroundColor: "#fff",
    transform: [{ rotate: "135deg" }],
  },
  topBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
    marginHorizontal: 10,
  },
  rightIconPlaceholder: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    backgroundColor: "#00A651",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
    fontSize: 16,
    color: "#fff",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});