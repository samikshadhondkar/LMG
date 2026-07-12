import api from "./api";

export const getFuelReport = async (params) => {
  const response = await api.get("/reports/fuel", { params });
  return response.data;
};

export const getExpenseReport = async (params) => {
  const response = await api.get("/reports/expenses", { params });
  return response.data;
};