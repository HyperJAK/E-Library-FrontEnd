import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5227',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllFormats = async () => {
    try {
        const response = await apiClient.get('/BookFormat/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all formats:', error);
        throw error;
    }
};

export const getFormatById = async (id) => {
    try {
        const response = await apiClient.get(`/BookFormat/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching format with ID ${id}:`, error);
        throw error;
    }
};

export const createFormat = async (newFormat) => {
    try {
        const response = await apiClient.post('/BookFormat/api/create', newFormat);
        return response.data;
    } catch (error) {
        console.error('Error creating format:', error);
        throw error;
    }
};

export const updateFormat = async (updatedFormat) => {
    try {
        const response = await apiClient.put('/BookFormat/api/update', updatedFormat);
        return response.data;
    } catch (error) {
        console.error('Error updating format:', error);
        throw error;
    }
};

export const deleteFormat = async (id) => {
    try {
        const response = await apiClient.delete('/BookFormat/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting format with ID ${id}:`, error);
        throw error;
    }
};
