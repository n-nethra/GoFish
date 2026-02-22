import { ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import "react-native-reanimated";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { User } from "firebase/auth";


import { useColorScheme } from "@/hooks/use-color-scheme";
import { auth } from "../firebase/firebaseConfig";
import { DarkTheme, LightTheme } from "../theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Splash
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const waveAnim = new Animated.Value(0);

  // Auth state
const [user, setUser] = useState<User | null | undefined>(undefined);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((u) => {
    setUser(u);
  });
  return unsubscribe;
}, []);

  // Splash animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          GoFish
        </Animated.Text>

        <Animated.View
          style={[
            styles.water,
            {
              transform: [
                {
                  translateY: waveAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
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
    color: "white",
    marginBottom: 20,
  },
  water: {
    width: 200,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
  },
});