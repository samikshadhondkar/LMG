import api from './api';

export async function getVehicles(filter = {}) {
  const query = new URLSearchParams(filter).toString();
  const response = await api.get(`/vehicles${query ? `?${query}` : ''}`);
  return response.data.data;
}

export async function getVehicle(id) {
  const response = await api.get(`/vehicles/${id}`);
  return response.data.data;
}

export async function createVehicle(payload) {
  const response = await api.post('/vehicles', payload);
  return response.data.data;
}

export async function updateVehicle(id, payload) {
  const response = await api.put(`/vehicles/${id}`, payload);
  return response.data.data;
}

export async function deleteVehicle(id) {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data.data;
}
