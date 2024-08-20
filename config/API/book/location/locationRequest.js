import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5227',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllLocations = async () => {
    try {
        const response = await apiClient.get('/BookLocation/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all locations:', error);
        throw error;
    }
};

export const getLocationById = async (id) => {
    try {
        const response = await apiClient.get(`/BookLocation/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching location with ID ${id}:`, error);
        throw error;
    }
};

export const createLocation = async (newLocation) => {
    try {
        const response = await apiClient.post('/BookLocation/api/create', newLocation);
        return response.data;
    } catch (error) {
        console.error('Error creating location:', error);
        throw error;
    }
};

export const updateLocation = async (updatedLocation) => {
    try {
        const response = await apiClient.put('/BookLocation/api/update', updatedLocation);
        return response.data;
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
};

export const deleteLocation = async (id) => {
    try {
        const response = await apiClient.delete('/BookLocation/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting location with ID ${id}:`, error);
        throw error;
    }
};
