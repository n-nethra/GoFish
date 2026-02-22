//profile screen

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, StyleSheet, View } from "react-native";
import { auth } from "../../firebase/firebaseConfig";

export async function logout() {
  try {
    await signOut(auth);
    router.replace("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default function Profile() {
  return (
    <View style={styles.container}>
      <Button title="Apartment" onPress={() => router.push("/apartments")} />
      <Button title="Roommate" onPress={() => router.push("/roommates")} />
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
});