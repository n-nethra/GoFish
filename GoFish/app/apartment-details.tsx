import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ApartmentDetails() {
  const { data } = useLocalSearchParams();
  const item = data ? JSON.parse(data as string) : null;

  if (!item) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Apartment",
            headerBackTitle: "Back",
          }}
        />
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          }}
          style={styles.heroImage}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            {item.formattedAddress}
          </Text>

          <Text style={styles.section}>
            Bedrooms: {item.bedrooms ?? "N/A"}
          </Text>

          <Text style={styles.section}>
            Bathrooms: {item.bathrooms ?? "N/A"}
          </Text>

          <Text style={styles.section}>
            Square Footage: {item.squareFootage ?? "N/A"}
          </Text>

          <Text style={styles.section}>
            Year Built: {item.yearBuilt ?? "N/A"}
          </Text>

          <Text style={styles.section}>
            Property Type: {item.propertyType ?? "N/A"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#001D4A",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  center: {
    flex: 1,
    backgroundColor: "#001D4A",
    justifyContent: "center",
    alignItems: "center",
  },

  heroImage: {
    width: "100%",
    height: 300,
  },

  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    marginTop: -30,
    minHeight: "100%",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },

  section: {
    fontSize: 16,
    marginBottom: 14,
  },
});