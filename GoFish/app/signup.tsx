import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, Text, TextInput, View, Pressable } from "react-native";
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
      const cred = await createUserWithEmailAndPassword(auth, email, password);

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
      <Text style={[globalStyles.title, { paddingTop: 100, paddingBottom: 20 }]}>
        Sign Up
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[globalStyles.input, { marginBottom: 30 }]}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={[
          globalStyles.button,
          {
            backgroundColor: "#006992",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 15,
          },
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={{ color: "#EAF8BF", fontWeight: "bold", fontSize: 18 }}>
          {loading ? "Creating..." : "Sign Up"}
        </Text>
      </Pressable>

      <Text
        style={globalStyles.link}
        onPress={() => router.push("/login")}
      >
        Already have an account? Log in
      </Text>
    </View>
  );
}