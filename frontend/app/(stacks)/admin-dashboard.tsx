import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { baseURL } from "@/constants/url";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobal } from "../context/useGlobal";

export default function AdminPanel() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const router = useRouter();
  const { setUserData } = useGlobal();

  // Fetch incidents from the backend using /report-incident path.
  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${baseURL}/report-incident`);
      console.log("Fetched incidents:", response.data);
      setIncidents(response.data);
    } catch (error: any) {
      Alert.alert("Error", "Unable to fetch incidents");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Update incident status from "Pending" to "Resolved" and update DB.
  const handleResolve = async (incidentId: number) => {
    try {
      // Send a PATCH request to update the incident's status in the DB
      await axios.patch(`${baseURL}/report-incident/${incidentId}`, { status: "Resolved" });
      Alert.alert("Success", "Incident status updated to Resolved");
      // Re-fetch incidents from backend to reflect the updated status
      fetchIncidents();
    } catch (error: any) {
      Alert.alert("Error", "Unable to update incident status");
      console.error(error);
    }
  };

  // Calculate summary counts
  const totalReports = incidents.length;
  const resolvedReports = incidents.filter((i) => i.status === "Resolved").length;
  const pendingReports = incidents.filter((i) => i.status === "Pending").length;

  const handleLogout = () => {
    // Clear user data from global context and navigate to login
    setUserData(null);
    router.replace("/(auth)/login");
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.incidentContainer}>
      <Text style={styles.incidentText}>
        Incident #{item.id}: {item.type}
      </Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      {item.status === "Pending" && (
        <TouchableOpacity onPress={() => handleResolve(item.id)}>
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.resolveButton}
          >
            <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recent Incidents</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Reports: {totalReports}</Text>
        <Text style={styles.summaryText}>Resolved Reports: {resolvedReports}</Text>
        <Text style={styles.summaryText}>Pending Reports: {pendingReports}</Text>
      </View>

      {/* Incident List */}
      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Logout Button with Red-Orange Gradient */}
      <TouchableOpacity style={styles.logoutButtonWrapper} onPress={handleLogout}>
        <LinearGradient
          colors={["#FF5F6D", "#FFC371"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "#00A651",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 28, // Larger header text
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
  },
  summaryContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  incidentContainer: {
    backgroundColor: "#222", // Dark card background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  incidentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  statusText: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  resolveButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resolveButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
    borderRadius: 8,
    overflow: "hidden",
  },
  logoutButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});