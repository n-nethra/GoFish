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
    const filters = {
      city: "Austin",
      state: "TX",
      propertyType: "Apartment",
      limit: 20,
    };

  
    if (city) filters.city = city;
    //if (beds) filters.beds = beds;
    //if (baths) filters.baths = baths;
    //if (minPrice) filters.min_rent = minPrice;
    //if (maxPrice) filters.max_rent = maxPrice;

    try {
      const result = await searchListings(filters);
      console.log("API RESPONSE:", result);

      let items: any[] = [];
      if (!result) items = [];
      else if (Array.isArray(result)) items = result;
      else if (Array.isArray(result.listings)) items = result.listings;
      else if (Array.isArray(result.data)) items = result.data;
      else if (Array.isArray(result.results)) items = result.results;
      else if (Array.isArray(result.items)) items = result.items;
      else items = [];

      setListings(items);
    } catch (err) {
      console.error("Search error:", err);
      setListings([]);
    }
  };

  const renderItem = ({ item }: any) => {
  const price = item?.price ?? item?.rent ?? null;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.primary_photo }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.price}>
          {price ? `$${Number(price).toLocaleString()}` : "Price unavailable"}
        </Text>

        <Text>
          {item?.beds ?? "?"} bd • {item?.baths ?? "?"} ba
        </Text>

        <Text>{item?.sqft ?? "N/A"} sqft</Text>

        <Text>
          {item?.address ?? item?.formattedAddress ?? "No address"}
        </Text>
      </View>
    </View>
  );
};

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

      {listings.length === 0 ? (
        <Text style={{ color: "#FFFFFF", textAlign: "center", marginTop: 20 }}>
          No results
        </Text>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item, index) =>
            String(item?.id ?? item?.listing_id ?? index)
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D4A", // darkblue
    padding: 20,
    paddingTop: 60,
  },

  searchBar: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  filterInput: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 25, // bubble look
    fontSize: 14,
    textAlign: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  searchBtn: {
    backgroundColor: "#006992", // brightblue
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  searchBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 18,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  image: {
    width: 110,
    height: 90,
    borderRadius: 12,
  },

  details: {
    paddingLeft: 12,
    justifyContent: "center",
    flex: 1,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#006992",
    marginBottom: 4,
  },
});