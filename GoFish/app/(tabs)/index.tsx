import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";


import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { router } from "expo-router";
import { globalStyles } from "@/styles/globalStyles";

export default function Index() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [sleepSchedule, setSleepSchedule] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [noiseLevel, setNoiseLevel] = useState("");
  const [loading, setLoading] = useState(true);
  

  // 🔹 Load user profile from Firestore
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setName(data.name ?? "");
          setSleepSchedule(data.preferences?.sleepSchedule ?? "");
          setCleanliness(data.preferences?.cleanliness ?? "");
          setNoiseLevel(data.preferences?.noiseLevel ?? "");
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to load profile");
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        name,
        preferences: {
          sleepSchedule,
          cleanliness,
          noiseLevel,
        },
      });

      Alert.alert("Success", "Profile updated");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save profile");
    }
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (!user) return null;

  return (
    <View style={globalStyles.container}>
      {/* User info */}
      <Text style={globalStyles.title}>Profile</Text>
      <Text style={globalStyles.section}>Email</Text>
      <Text style={globalStyles.paragraphText}>{user.email}</Text>

      <Text style={globalStyles.section}>Name</Text>
      <TextInput
        style={globalStyles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />

      {/* Preferences */}
      <Text style={globalStyles.section}>Preferences</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Morning or night person?"
        value={sleepSchedule}
        onChangeText={setSleepSchedule}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Clean or messy?"
        value={cleanliness}
        onChangeText={setCleanliness}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Quiet or noisy?"
        value={noiseLevel}
        onChangeText={setNoiseLevel}
      />

      <Button title="Save Preferences" onPress={saveProfile} />

      <View style={{ marginTop: 20 }}>
        <Button title="Log out" color="red" onPress={logout} />
      </View>
    </View>
  );
}