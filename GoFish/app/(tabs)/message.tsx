//messaging screen (all DMs shown here)

import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase/firebaseConfig";

export default function Messages() {
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();
  const currentUserId = "CURRENT_USER_ID"; // Replace with actual user ID

  useEffect(() => {
    const fetchMatches = async () => {
      const snapshot = await getDocs(collection(db, "matches"));
      const filtered = snapshot.docs
        .map(doc => {
          const data = doc.data() as { users?: string[] };
          return { id: doc.id, ...data };
        })
        .filter(match => Array.isArray(match.users) && match.users.includes(currentUserId));
      setMatches(filtered);
    };

    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/chat",
                params: { matchId: item.id },
              })
            }
          >
            <Text style={styles.chatText}>Chat</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001D4A", padding: 20 },
  chatItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  chatText: {
    fontSize: 18,
    fontWeight: "600",
  },
});