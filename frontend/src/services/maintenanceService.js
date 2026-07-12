import api from './api';

export async function getMaintenance(filter = {}) {
  const query = new URLSearchParams(filter).toString();
  const response = await api.get(`/maintenance${query ? `?${query}` : ''}`);
  return response.data.data;
}

export async function getMaintenanceById(id) {
  const response = await api.get(`/maintenance/${id}`);
  return response.data.data;
}

export async function createMaintenance(payload) {
  const response = await api.post('/maintenance', payload);
  return response.data.data;
}

export async function updateMaintenance(id, payload) {
  const response = await api.put(`/maintenance/${id}`, payload);
  return response.data.data;
}

export async function deleteMaintenance(id) {
  const response = await api.delete(`/maintenance/${id}`);
  return response.data.data;
}
