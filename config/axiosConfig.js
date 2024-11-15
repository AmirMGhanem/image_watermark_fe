import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api', // Define your base URL here
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Optional: set a timeout
});

export default apiClient;
