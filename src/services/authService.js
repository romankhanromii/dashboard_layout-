import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


// Register user
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Login user
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log("first",response)
        // Save JWT token to localStorage
        if (response.data.token) {
            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
};

// Get JWT token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};
