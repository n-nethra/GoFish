import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { router } from "expo-router";
import { globalStyles } from "@/styles/globalStyles";

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [name, setName] = useState("");
  const [sleepSchedule, setSleepSchedule] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [noiseLevel, setNoiseLevel] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Listen to auth state
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((u) => {
    setUser(u);
  });
  return unsubscribe;
}, []);

useEffect(() => {
  if (user === null) {
    router.replace("/login");
  }
}, [user]);

  // 🔹 Load profile once user is available
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
  }, [user]);

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

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (!user || loading) return <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>Loading...</Text>;

  return (
    <View style={[globalStyles.container, { marginHorizontal: 10 }]}>
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

      <TouchableOpacity style={[globalStyles.button, { width: "75%", alignSelf: "center" }]} onPress={saveProfile}>
        <Text style={globalStyles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[globalStyles.button, { backgroundColor: "#b86323", marginTop: 30, width: "50%", alignSelf: "center", }]} onPress={logout}>
        <Text style={globalStyles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}