import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useGlobal } from "../context/useGlobal";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryItem {
  id: string;
  titleEn: string;
  titleUr: string;
  icon: any; // local images using require return a number
  route?: string;
  unreadCount?: number; // for Notifications
}

const categories: CategoryItem[] = [
  {
    id: "1",
    titleEn: "Report Incident",
    titleUr: "واقعہ رپورٹ کریں",
    icon: require("../../assets/images/report.png"), // Adjust path as needed
    route: "(report-incident)",
  },
  {
    id: "2",
    titleEn: "Incident Map",
    titleUr: "واقعات کا نقشہ",
    icon: require("../../assets/images/map.png"), // Adjust path as needed
    route: "map",
  },
  {
    id: "3",
    titleEn: "Community Discussions",
    titleUr: "کمیونٹی مباحثے",
    icon: require("../../assets/images/group.png"), // Adjust path as needed
    route: "community",
  },
  {
    id: "4",
    titleEn: "Notifications",
    titleUr: "اطلاعات",
    icon: require("../../assets/images/note.png"), // Adjust path as needed
    route: "notificaitons",
    unreadCount: 3, // Example unread count
  },
];

export default function CategorySelectScreen() {
  const router = useRouter();
  const { userData } = useGlobal();

  const handleCategoryPress = (route?: string) => {
    if (route) {
      router.replace(route);
    }
  };

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.route)}
    >
      {/* White circle container */}
      <View style={styles.iconCircle}>
        <Image source={item.icon} style={styles.categoryIcon} resizeMode="contain" />
        {item.id === "4" && item.unreadCount && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <Text style={styles.categoryTitleEn}>{item.titleEn}</Text>
      <Text style={styles.categoryTitleUr}>{item.titleUr}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Neighbourhood saftey app</Text>
      </View>

      {/* Welcome Text */}
      <Text style={styles.helloUserText}>
        {userData
          ? `HELLO ${userData.firstName} ${userData.lastName}`
          : "HELLO Guest"}
      </Text>

      {/* 2×2 Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Profile Button in Bottom Middle */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push("/(stacks)/profile")}
      >
        <LinearGradient
          colors={["#21D4FD", "#00FF66"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.profileButtonText}>Go to User Profile</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background fills entire screen
    margin: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  topBar: {
    backgroundColor: "#00A651",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  topBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
  },
  helloUserText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "600",
  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  unreadBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#f00",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryTitleEn: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 2,
  },
  categoryTitleUr: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
  profileButton: {
    marginVertical: 20,
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
  profileButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});