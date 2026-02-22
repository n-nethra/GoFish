import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { searchListings } from "../../api/rentcast";
import { globalStyles } from "@/styles/globalStyles";

export default function ApartmentSearch() {
  const [city, setCity] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [listings, setListings] = useState<any[]>([]);
  const router = useRouter();

  const handleSearch = async () => {
    const filters: any = {
      city: city || "Austin",
      state: "TX",
      propertyType: "Apartment",
      limit: 20,
    };

    try {
      const result = await searchListings(filters);
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
  if (!city) return;

  const filters: any = {
    city: city,
    propertyType: "Apartment",
    limit: 20,
  };

  try {
    const result = await searchListings(filters);
    console.log("API RESPONSE:", result);

    if (Array.isArray(result)) {
      setListings(result);
    } else if (Array.isArray(result?.data)) {
      setListings(result.data);
    } else {
      setListings([]);
    }
  } catch (err) {
    console.error("Search error:", err);
    setListings([]);
    }
  };

const renderItem = ({ item }: any) => {
  const bedrooms = item?.bedrooms ?? "?";
  const bathrooms = item?.bathrooms ?? "?";
  const sqft = item?.squareFootage ?? "N/A";
  const address = item?.formattedAddress ?? "No address available";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/apartment-details",
          params: { data: JSON.stringify(item) },
        })
      }
    >
      <View style={globalStyles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          }}
          style={globalStyles.cardImage}
        />

        <View style={globalStyles.cardDetails}>
          <Text style={globalStyles.cardPrice}>Property Details</Text>

          <Text>
            {bedrooms} bd • {bathrooms} ba
          </Text>

          <Text>{sqft} sqft</Text>

          <Text>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
  }

  return (
    <View style={{ ...globalStyles.container, marginTop: 20}}>
      <Text style={{ ...globalStyles.title, marginBottom: 20 }}>Find Apartments</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Search by city"
        value={city}
        onChangeText={setCity}
      />

      <View style={globalStyles.filterRow}>
        <TextInput style={globalStyles.filterInput} placeholder="Beds" value={beds} onChangeText={setBeds} />
        <TextInput style={globalStyles.filterInput} placeholder="Baths" value={baths} onChangeText={setBaths} />
        <TextInput style={globalStyles.filterInput} placeholder="Min $" value={minPrice} onChangeText={setMinPrice} />
        <TextInput style={globalStyles.filterInput} placeholder="Max $" value={maxPrice} onChangeText={setMaxPrice} />
      </View>

      <TouchableOpacity style={[globalStyles.button, { marginBottom: 20 }]} onPress={handleSearch}>
        <Text style={[globalStyles.buttonText]}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Image source={{ uri: item.primary_photo }} style={globalStyles.cardImage} />
            <View style={globalStyles.cardDetails}>
              <Text style={globalStyles.cardPrice}>${item.price}</Text>
              <Text style={globalStyles.cardText}>{item.beds} bd • {item.baths} ba</Text>
              <Text style={globalStyles.cardText}>{item.sqft} sqft</Text>
              <Text style={globalStyles.cardText}>{item.address}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}


