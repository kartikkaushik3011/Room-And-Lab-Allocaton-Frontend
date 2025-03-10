import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

// Handle expired token
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getCurrentUser = async () => (await api.get('/currentUser')).data;

export const signup = async (data) => await api.post('/signup', data);
export const login = async (data) => (await api.post('/login', data)).data;
export const logout = async () => await api.get('/logout');

export const fetchRoomData = async (blockCode) => (await api.get(`/roomData/${blockCode}`)).data;
export const fetchSeminarAudiData = async () => (await api.get('/seminarAudiData')).data;

export const fetchPendingRequests = async () => {
    try {
        const response = await api.get('/pendingRequests');
        return response.data;
    } catch (err) {
        console.error("Failed to fetch requests:", err);
        return [];
    }
};

export const approveRequest = async (index) => await api.post('/approveRequest', { index });
export const rejectRequest = async (index) => await api.post('/rejectRequest', { index });

export const bookRoom = async (place, blockCode, roomNo, day, slot, bookingData) =>
    await api.post(`/book/${place}/${blockCode}/${roomNo}/${day}/${slot}`, bookingData);

export const bookSeminar = async (blockCode, seminar, date, slot, bookingData) =>
    await api.post(`/bookSeminar/${blockCode}/${seminar}/${date}/${slot}`, bookingData);
