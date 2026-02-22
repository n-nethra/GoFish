//roommates screen

import { useRouter } from "expo-router";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { db } from "../../firebase/firebaseConfig";

export default function Roommates() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const router = useRouter();

  const currentUserId = "CURRENT_USER_ID"; // replace later with auth

  useEffect(() => {
    const fetchProfiles = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfiles(users);
    };

    fetchProfiles();
  }, []);

  const handleMatch = async (matchedUser: any) => {
    await addDoc(collection(db, "matches"), {
      users: [currentUserId, matchedUser.id],
      createdAt: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={(card) => {
          if (!card) return <Text>No more profiles</Text>;
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: "https://i.pravatar.cc/300" }}
                style={styles.avatar}
              />
              <Text style={styles.name}>{card.name}</Text>
              <Text>Cleanliness: {card.preferences?.cleanliness}</Text>
              <Text>Noise: {card.preferences?.noiseLevel}</Text>
              <Text>Sleep: {card.preferences?.sleepSchedule}</Text>
            </View>
          );
        }}
        onSwipedRight={(index) => handleMatch(profiles[index])}
        onSwipedLeft={() => {}}
        backgroundColor="#001D4A"
        stackSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001D4A" },
  card: {
    flex: 0.8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});