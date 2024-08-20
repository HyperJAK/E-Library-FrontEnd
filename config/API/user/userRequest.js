import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5227',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/User/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

export const createUser = async (newUser) => {
    try {
        const response = await apiClient.post('/User/api/create', newUser);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (updatedUser) => {
    try {
        const response = await apiClient.put('/User/api/update', updatedUser);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete('/User/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};
