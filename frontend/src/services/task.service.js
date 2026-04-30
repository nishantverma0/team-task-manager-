import api from './api';
export const createTask = (projectId, data) => api.post(`/tasks/project/${projectId}`, data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const updateStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const myTasks = () => api.get('/tasks/my');
export const getStats = () => api.get('/dashboard/stats');