// ./(stacks)/+not-found.tsx
import { Link, Stack } from "expo-router";
import { StyleSheet, Image } from "react-native";

import { Colors, Typography, Spacing } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      {/* <ThemedView style={styles.container}>
        <Image source={{ uri: "https://i.ibb.co/7b6Jg6G/not-found.png" }} style={styles.image} resizeMode="contain" />
        <ThemedText type="title" style={styles.title}>
          Page Not Found
        </ThemedText>
        <ThemedText type="default" style={styles.message}>
          The screen you're looking for doesn't exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to Home</ThemedText>
        </Link>
      </ThemedView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xxLarge,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: Typography.sizes.medium,
    color: Colors.muted,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  link: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
});
