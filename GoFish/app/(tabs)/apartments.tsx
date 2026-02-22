//apartments screen

import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchListings } from "../../api/rentcast";

export default function ApartmentSearch() {
  const [city, setCity] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listings, setListings] = useState<any[]>([]);

  const handleSearch = async () => {
    const filters: any = {};

    if (city) filters.city = city;
    if (beds) filters.beds = beds;
    if (baths) filters.baths = baths;
    if (minPrice) filters.min_rent = minPrice;
    if (maxPrice) filters.max_rent = maxPrice;

    const result = await searchListings(filters);
    if (result) setListings(result.data);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.primary_photo }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.price}>${item.price.toLocaleString()}</Text>
        <Text>{item.beds} bd • {item.baths} ba</Text>
        <Text>{item.sqft} sqft</Text>
        <Text>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by city"
        value={city}
        onChangeText={setCity}
      />

      {/* FILTER INPUTS */}
      <View style={styles.filters}>
        <TextInput
          style={styles.filterInput}
          placeholder="Beds"
          value={beds}
          onChangeText={setBeds}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Baths"
          value={baths}
          onChangeText={setBaths}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Min $"
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Max $"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="number-pad"
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchBtnText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  filters: { flexDirection: "row", justifyContent: "space-between" },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    margin: 2,
    padding: 6,
    borderRadius: 6,
  },
  searchBtn: {
    backgroundColor: "#0b3d91",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  searchBtnText: { color: "white", fontWeight: "600" },
  card: { flexDirection: "row", marginVertical: 8 },
  image: { width: 120, height: 90, borderRadius: 8 },
  details: { paddingLeft: 10, justifyContent: "center" },
  price: { fontSize: 18, fontWeight: "bold" },
});