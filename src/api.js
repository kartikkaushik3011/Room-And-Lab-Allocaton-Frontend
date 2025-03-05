import axios from 'axios';

const api = axios.create({
    baseURL: 'https://room-and-lab-allocation-backend-1.onrender.com',
    withCredentials: true
});

export const getCurrentUser = async () => (await api.get('/currentUser')).data;

export const signup = async (data) => await api.post('/signup', data);
export const login = async (data) => (await api.post('/login', data)).data;
export const logout = async () => await api.get('/logout');

export const fetchRoomData = async (blockCode) => (await api.get(`/roomData/${blockCode}`)).data;
export const fetchSeminarAudiData = async () => (await api.get('/seminarAudiData')).data;

export const fetchPendingRequests = async () => (await api.get('/pendingRequests')).data;
export const approveRequest = async (index) => await api.post('/approveRequest', { index });
export const rejectRequest = async (index) => await api.post('/rejectRequest', { index });

export const bookRoom = async (place, blockCode, roomNo, day, slot, bookingData) => 
    await api.post(`/book/${place}/${blockCode}/${roomNo}/${day}/${slot}`, bookingData);

export const bookSeminar = async (blockCode, seminar, date, slot, bookingData) => 
    await api.post(`/bookSeminar/${blockCode}/${seminar}/${date}/${slot}`, bookingData);
