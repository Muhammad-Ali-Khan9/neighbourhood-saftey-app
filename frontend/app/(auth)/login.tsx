import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter, Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useGlobal } from "../context/useGlobal";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const { userData } = useGlobal()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const router = useRouter();
  const { setUserData } = useGlobal();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.137.1:3000/users/login", {
        email,
        password,
        role,
      });
      console.log("Login response:", response.data);
      setUserData(response.data);

      console.log(userData);
      if (role == "user")
        router.replace("/(stacks)/");
      else
        router.replace("/(stacks)/admin-dashboard");

    } catch (err: any) {
      Alert.alert("Login Error", err.response?.data?.message || err.message);
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
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* (Optional) Add logo or menu here */}
      </View>

      {/* Title & Subtitle */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          fontStyle: "italic",
          color: "#fff",
          marginBottom: 5,
          textAlign: "center",
        }}
      >
        Welcome to <Text style={{ color: "#00FF66" }}>Neighbourhood Safety App</Text>
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#aaa",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        The Most Popular Social Media App.
      </Text>

      {/* Email Input */}
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
        placeholder="E-mail / Username"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
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

      {/* Role Selection Dropdown */}
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

      {/* Forgot Password */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Implement flow here")}>
          <Text style={{ fontSize: 14, color: "#00FF66" }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* SIGN IN Button with Blue-Green Gradient */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
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
            SIGN IN
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#777", fontSize: 14, marginRight: 5 }}>
          Didn't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={{ color: "#00FF66", fontSize: 14, fontWeight: "bold" }}>
            SIGN UP NOW
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}