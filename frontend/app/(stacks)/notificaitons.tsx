import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { baseURL } from "@/constants/url";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${baseURL}/notifications`);
      setNotifications(response.data);
    } catch (error: any) {
      Alert.alert("Error", "Unable to fetch notifications");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = async (notificationId: number) => {
    try {
      await axios.patch(`${baseURL}/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error: any) {
      Alert.alert("Error", "Unable to update notification");
      console.error(error);
    }
  };

  const handleGoBack = () => {
    router.push("/(stacks)/");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Notifications</Text>
      </View>

      {/* Notification List */}
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <View key={notif.id} style={styles.notificationCard}>
            <Text style={[styles.title, notif.isRead && styles.readTitle]}>
              {notif.message}
            </Text>
            <Text style={styles.details}>
              {notif.createdAt
                ? new Date(notif.createdAt).toLocaleString()
                : "Reported time unknown"}
            </Text>
            {!notif.isRead && (
              <TouchableOpacity
                style={styles.readButton}
                onPress={() => markAsRead(notif.id)}
              >
                <Text style={styles.readButtonText}>Mark as read</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noNotifications}>No notifications</Text>
      )}

      {/* Go Back Button with Gradient */}
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background fills entire screen
    padding: 20,
  },
  topBar: {
    backgroundColor: "#00A651",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  topBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
  },
  notificationCard: {
    backgroundColor: "#222", // Dark card background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  readTitle: {
    color: "#888", // Gray indicates a read notification
  },
  details: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  readButton: {
    backgroundColor: "#007AFF", // Fallback solid color; can be replaced with a gradient if desired
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  readButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  noNotifications: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
  goBackButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});