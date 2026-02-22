const BASE_URL = "https://api.rentcast.io/v1";
const API_KEY = "e2540f57b4044ad4ba508b3671e8ba43";

export const searchListings = async (filters: any) => {
  const queryString = new URLSearchParams(filters).toString();

  const response = await fetch(
    `${BASE_URL}/properties?${queryString}`,
    {
      headers: {
        "X-Api-Key": "e2540f57b4044ad4ba508b3671e8ba43",
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();
  console.log("RENTCAST RAW RESPONSE:", data);

  return data;
};