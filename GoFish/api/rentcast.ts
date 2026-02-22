import axios from "axios";

const BASE_URL = "https://api.rentcast.io/v1";

export const searchListings = async (filters: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/listings/search`, {
      params: filters,
      headers: {
        Authorization: `Bearer YOUR_API_KEY`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Rentcast API Error", error);
    return null;
  }
};