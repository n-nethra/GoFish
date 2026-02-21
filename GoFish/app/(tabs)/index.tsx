import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button
        title="Apartment"
        onPress={() => navigation.navigate("Apartments")}
      />

      <Button
        title="Roommate"
        onPress={() => navigation.navigate("Roommates")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
});