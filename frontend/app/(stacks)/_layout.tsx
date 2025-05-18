import React from "react";
import { StyleSheet, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalProvider } from "../context/useGlobal";

export default function Layout() {
  return (
    <GlobalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Drawer with side menu */}
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: styles.drawer,
            drawerLabelStyle: styles.drawerLabel,
            drawerActiveTintColor: "#00A651",
            drawerInactiveTintColor: "#fff",
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="admin-dashboard"
            options={{
              drawerLabel: "Admin Dashboard",
              title: "Admin Dashboard",
            }}
          />
          <Drawer.Screen
            name="community"
            options={{
              drawerLabel: "Community",
              title: "Community",
            }}
          />
          <Drawer.Screen
            name="(report-incident)"
            options={{
              drawerLabel: "Report Incident",
              title: "Report Incident",
            }}
          />
          <Drawer.Screen
            name="map"
            options={{
              drawerLabel: "Incident Map",
              title: "Incident Map",
            }}
          />
          <Drawer.Screen
            name="notifications"
            options={{
              drawerLabel: "Notifications",
              title: "Notifications",
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              title: "Profile",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#111", // Drawer (side menu) background color
    width: 240,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});