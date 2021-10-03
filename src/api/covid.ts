import axios from "axios";

const http = axios.create({
  baseURL: "https://coronavirus-tracker-api.herokuapp.com/v2/locations",
});

export const getAllLocations = async () => {
  const locations = await http.get("/");
  return locations.data;
};
