//roommates screen

import { MaterialIcons } from "@expo/vector-icons";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Roommates() {
  const [users, setUsers] = useState<any[]>([]);
  const position = new Animated.ValueXY();

  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };

    fetchUsers();
  }, []);

  const swipe = async (direction: "left" | "right") => {
    const swipedUser = users[0];
    if (!swipedUser || !currentUserId) return;

    if (direction === "right") {
      await addDoc(collection(db, "matches"), {
        users: [currentUserId, swipedUser.id],
        createdAt: new Date().toISOString(),
      });
    }

    Animated.timing(position, {
      toValue: { x: direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      setUsers(prev => prev.slice(1));
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > 120) swipe("right");
      else if (gesture.dx < -120) swipe("left");
      else resetPosition();
    },
  });

  if (!users.length) {
    return <Text style={styles.empty}>No roommates found.</Text>;
  }

  const top = users[0];

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, position.getLayout()]}
      >
        <MaterialIcons name="person" size={48} color="#006992" style={styles.icon} />
        <Text style={styles.name}>{top.name}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    alignItems: "center",
  },
  icon: { marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 50 },
});