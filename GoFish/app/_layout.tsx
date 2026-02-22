import { ThemeProvider, useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet, View, Dimensions, Image } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, LightTheme } from "../theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

const { width } = Dimensions.get("window");

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const [showSplash, setShowSplash] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current; // Splash fade out
  const logoBobAnim = useRef(new Animated.Value(0)).current; // Logo bobbing
  const fishXAnim = useRef(new Animated.Value(-160)).current; // Fish horizontal movement
  const fishYAnim = useRef(new Animated.Value(0)).current; // Fish vertical bobbing

  useEffect(() => {
    // Logo bobbing loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoBobAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoBobAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fish horizontal swimming loop
    Animated.loop(
      Animated.timing(fishXAnim, {
        toValue: width + 160, // fish width, moves offscreen right
        duration: 3200,        // faster than 4000ms
        useNativeDriver: true,
      })
    ).start();

    // Fish vertical bobbing loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(fishYAnim, {
          toValue: -15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fishYAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Splash fade-out timeout
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim, backgroundColor: theme.colors.background }]}>
        {/* Logo */}
        <Animated.Image
          source={require("../assets/images/gofishlogo.png")}
          style={[styles.logo, { transform: [{ translateY: logoBobAnim }] }]}
          resizeMode="contain"
        />

        {/* Fish swimming */}
        <Animated.Image
          source={require("../assets/images/fish.png")}
          style={[
            styles.fish,
            { transform: [{ translateX: fishXAnim }, { translateY: fishYAnim }] },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 500,
    height: 300,
    marginBottom: 40,
  },
  fish: {
    width: 160,
    height: 100,
    position: "absolute",
    bottom: 150,
  },
});