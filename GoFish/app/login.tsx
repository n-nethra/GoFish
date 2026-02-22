import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TextInput, View, Pressable } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { globalStyles } from "@/styles/globalStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/"); // go to app
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={[globalStyles.button, { backgroundColor: "#006992", paddingVertical: 12, borderRadius: 8, alignItems: "center" }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: "#EAF8BF", fontWeight: "bold" }}>
          {loading ? "Logging in..." : "Log In"}
        </Text>
      </Pressable>

      <Text
        style={globalStyles.link}
        onPress={() => router.push("/signup")}
      >
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}