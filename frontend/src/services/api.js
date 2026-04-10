import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
});

export const registerUser = (data) =>
    axios.post(`${API_URL}/auth/register`, data);

export const loginUser = (data) =>
    axios.post(`${API_URL}/auth/login`, data);

export const analyzeSentiment = (data) =>
    axios.post(`${API_URL}/sentiment/analyze`, data, authHeaders());

export const getHistory = () =>
    axios.get(`${API_URL}/sentiment/history`, authHeaders());

export const getStats = () =>
    axios.get(`${API_URL}/sentiment/stats`, authHeaders());
export const deleteHistory = (id) =>
    axios.delete(`${API_URL}/sentiment/history/${id}`, authHeaders());