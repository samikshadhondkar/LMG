import api from "./api";

export const getFuel = async () => {
  const response = await api.get("/fuel");
  return response.data;
};

export const createFuel = async (data) => {
  const response = await api.post("/fuel", data);
  return response.data;
};