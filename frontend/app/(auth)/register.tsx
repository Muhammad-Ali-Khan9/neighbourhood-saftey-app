import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobal } from "../context/useGlobal";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { baseURL } from "@/constants/url";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"

  const router = useRouter();
  const { setUserData } = useGlobal();

  const handleRegister = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
      };

      const response = await axios.post(`${baseURL}/users/register`, payload);
      console.log("Registration response:", response.data);

      // Save the returned user data
      setUserData(response.data);

      // Redirect after successful registration
      router.replace("/(stacks)/admin-dashboard");
    } catch (err: any) {
      Alert.alert("Registration Error", err.response?.data?.message || err.message);
      console.error(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111",
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >
      {/* Header row with brand & menu */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          fontStyle: "italic",
          color: "#fff",
          marginBottom: 5,
        }}
      >
        Create an <Text style={{ color: "#00FF66" }}>Account</Text>
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#aaa",
          marginBottom: 20,
        }}
      >
        Join the Most Popular Social Media App.
      </Text>

      {/* First Name */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          color: "#fff",
          fontSize: 16,
        }}
        placeholder="First Name"
        placeholderTextColor="#777"
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          color: "#fff",
          fontSize: 16,
        }}
        placeholder="Last Name"
        placeholderTextColor="#777"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Email */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          color: "#fff",
          fontSize: 16,
        }}
        placeholder="Email"
        placeholderTextColor="#777"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          color: "#fff",
          fontSize: 16,
        }}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Phone Number */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          color: "#fff",
          fontSize: 16,
        }}
        placeholder="Phone Number"
        placeholderTextColor="#777"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Role Picker */}
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#222",
          borderRadius: 8,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#444",
          justifyContent: "center",
        }}
      >
        <Picker
          selectedValue={role}
          style={{ width: "100%", height: 50, color: "#fff" }}
          dropdownIconColor="#fff"
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

      {/* Register Button (Blue-Green Gradient) */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]} // Blue -> Green gradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#111",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            REGISTER
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Already have an account? Login */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 10 }}
      >
        <Text
          style={{
            color: "#00FF66",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}