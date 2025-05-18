import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import { baseURL } from "@/constants/url";
import { useGlobal } from "../context/useGlobal";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function IncidentsDiscussion() {
  const [incidents, setIncidents] = useState<any[]>([]);
  // Local state to hold new comment input for each incident
  const [newComments, setNewComments] = useState<{ [incidentId: number]: string }>({});
  const router = useRouter();
  const { userData } = useGlobal();

  // Function to fetch incidents and attach comments for each incident
  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${baseURL}/report-incident`);
      const incidentsData = response.data; // assume an array of incidents

      // For each incident, fetch its comments using the new endpoint
      const incidentsWithComments = await Promise.all(
        incidentsData.map(async (incident: any) => {
          try {
            const commentsResponse = await axios.get(
              `${baseURL}/comments/incident/${incident.id}`
            );
            console.log(`Comments for incident ${incident.id}:`, commentsResponse.data);
            return { ...incident, comments: commentsResponse.data };
          } catch (error) {
            console.error(`Error fetching comments for incident ${incident.id}:`, error);
            return { ...incident, comments: [] };
          }
        })
      );

      setIncidents(incidentsWithComments);
    } catch (error: any) {
      Alert.alert("Error", "Unable to fetch incidents");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handlePostComment = async (incidentId: number) => {
    const message = newComments[incidentId];
    if (!message || message.trim() === "") return;

    try {
      // Build payload using message, incidentId, and userId from global context
      const payload = {
        message,
        incidentId,
        userId: userData ? userData.id : null,
      };

      console.log(userData);
      const response = await axios.post(`${baseURL}/comments`, payload);
      console.log(`New comment for incident ${incidentId}:`, response.data);

      // Prepend the new comment to the incident's comments array
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === incidentId
            ? { ...incident, comments: [response.data, ...(incident.comments || [])] }
            : incident
        )
      );

      // Clear the input for that incident
      setNewComments((prev) => ({ ...prev, [incidentId]: "" }));
    } catch (error: any) {
      Alert.alert("Error", "Unable to post comment");
      console.error(error);
    }
  };

  const handleGoBack = () => {
    router.push("/(stacks)/");
  };

  const renderItem = ({ item }: { item: any }) => (
    <View key={item.id} style={styles.incidentCard}>
      <Text style={styles.incidentType}>{item.type}</Text>
      <Text style={styles.incidentDescription}>{item.description}</Text>
      <Text style={styles.incidentDetails}>
        Location: {item.location} | Date:{" "}
        {item.datetime ? new Date(item.datetime).toLocaleString() : "Unknown"}
      </Text>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        {item.comments && item.comments.length > 0 ? (
          item.comments.map((comment: any) => (
            <View key={`${item.id}-${comment.id}`} style={styles.commentCard}>
              <Text style={styles.commentMessage}>{comment.message}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noComments}>No comments yet</Text>
        )}
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor="#777"
          value={newComments[item.id] || ""}
          onChangeText={(text) => setNewComments((prev) => ({ ...prev, [item.id]: text }))}
        />
        <TouchableOpacity
          style={styles.commentPostButtonWrapper}
          onPress={() => handlePostComment(item.id)}
        >
          <LinearGradient
            colors={["#21D4FD", "#00FF66"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.commentPostButton}
          >
            <Text style={styles.commentPostButtonText}>Post Comment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Incidents and Discussions</Text>
      {incidents.length > 0 ? (
        incidents.map((incident) => renderItem({ item: incident }))
      ) : (
        <Text style={styles.noIncidents}>No incidents found</Text>
      )}
      {/* Go Back Button with Gradient */}
      <TouchableOpacity style={styles.goBackButtonWrapper} onPress={handleGoBack}>
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.goBackButton}
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
    padding: 20,
    backgroundColor: "#111", // Black background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  incidentCard: {
    backgroundColor: "#222", // Dark card background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  incidentType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  incidentDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
  incidentDetails: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  commentCard: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentMessage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  noComments: {
    fontStyle: "italic",
    color: "#777",
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#222",
  },
  commentPostButtonWrapper: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  commentPostButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  commentPostButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  noIncidents: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
  goBackButtonWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
    borderRadius: 8,
    overflow: "hidden",
  },
  goBackButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackButtonText: {
    textAlign: "center",
    paddingVertical: 15,
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});