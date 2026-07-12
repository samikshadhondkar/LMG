import api from './api';

export async function getTrips(filter = {}) {
  const query = new URLSearchParams(filter).toString();
  const response = await api.get(`/trips${query ? `?${query}` : ''}`);
  return response.data.data;
}

export async function getTrip(id) {
  const response = await api.get(`/trips/${id}`);
  return response.data.data;
}

export async function createTrip(payload) {
  const response = await api.post('/trips', payload);
  return response.data.data;
}

export async function updateTrip(id, payload) {
  const response = await api.put(`/trips/${id}`, payload);
  return response.data.data;
}

export async function deleteTrip(id) {
  const response = await api.delete(`/trips/${id}`);
  return response.data.data;
}
