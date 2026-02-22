//messaging screen (all DMs shown here)

import { useRouter } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";

type MatchItem = {
  id: string;
  otherName: string;
};

export default function Messages() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const router = useRouter();
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUserId) return;

      const snapshot = await getDocs(collection(db, "matches"));
      const items: MatchItem[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as { users?: string[] };
        const users = data.users || [];

        if (users.includes(currentUserId)) {
          const otherId = users.find(id => id !== currentUserId);

          if (otherId) {
            const userDoc = await getDoc(doc(db, "users", otherId));
            const userData = userDoc.data() as { name?: string };

            if (userData?.name) {
              items.push({ id: docSnap.id, otherName: userData.name });
            }
          }
        }
      }

      setMatches(items);
    };

    fetchMatches();
  }, [currentUserId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              router.push({ pathname: "/chat", params: { matchId: item.id } })
            }
          >
            <Text style={styles.chatText}>{item.otherName}</Text>
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
    justifyContent: "center",
  },
  chatText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
});