import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { globalStyles } from "@/styles/globalStyles";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      // 1️⃣ Create Auth user
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Create Firestore user profile
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        name: "", // user can set later
        preferences: {
          sleepSchedule: "",
          cleanliness: "",
          noiseLevel: "",
        },
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Go to app
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Sign Up</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Creating..." : "Sign Up"}
        onPress={handleSignup}
      />

      <Text style={globalStyles.link} onPress={() => router.push("/login")}>
        Already have an account? Log in
      </Text>
    </View>
  );
}