//chat screen (one DM between 2 users)

import { useLocalSearchParams } from "expo-router";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase/firebaseConfig";


export default function Chat() {
  const { matchId } = useLocalSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    const snapshot = await getDocs(collection(db, "matches", String(matchId), "messages"));
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMessages(msgs);
  };

  const sendMessage = async () => {
    if (!input) return;
    await addDoc(collection(db, "matches", String(matchId), "messages"), {
      text: input,
      createdAt: new Date().toISOString(),
    });
    setInput("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.text}</Text>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type message..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={{ color: "#006992", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
  message: {
    padding: 10,
    backgroundColor: "#E5E5EA",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});