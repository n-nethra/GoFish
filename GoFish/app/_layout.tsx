import { ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet, View, Dimensions, Image } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { auth } from "../firebaseConfig";
import { DarkTheme, LightTheme } from "../theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Splash
  const [showSplash, setShowSplash] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current; // fade out
  const bobAnim = useRef(new Animated.Value(0)).current; // title bobbing
  const fishXAnim = useRef(new Animated.Value(-100)).current; // fish horizontal
  const fishYAnim = useRef(new Animated.Value(0)).current; // fish bobbing

  // Auth state
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  // Splash animation
  useEffect(() => {
    // Title bobbing loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fish horizontal swim loop
    Animated.loop(
      Animated.timing(fishXAnim, {
        toValue: width + 100,
        duration: 4000,
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

    // Splash timeout with fade out
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
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateY: bobAnim }],
            },
          ]}
        >
          GoFish
        </Animated.Text>

        {/* Fish swimming */}
        <Animated.Image
          source={require("../assets/images/fish.png")}
          style={[
            styles.fish,
            {
              transform: [
                { translateX: fishXAnim },
                { translateY: fishYAnim },
              ],
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Redirect href="/login" />
          </>
        )}

        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#0b3d91",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#ECA400",
  },
  fish: {
    width: 80,
    height: 50,
    position: "absolute",
    bottom: 250, // fish is higher now
  },
});