import {apiClient} from '../../server'

export const getAllLanguages = async () => {
    try {
        const response = await apiClient.get('/Language/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all languages:', error);
        throw error;
    }
};

export const getLanguageById = async (id) => {
    try {
        const response = await apiClient.get(`/Language/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching language with ID ${id}:`, error);
        throw error;
    }
};

export const createLanguage = async (newLanguage) => {
    try {
        const response = await apiClient.post('/Language/api/create', newLanguage);
        return response.data;
    } catch (error) {
        console.error('Error creating language:', error);
        throw error;
    }
};

export const updateLanguage = async (updatedLanguage) => {
    try {
        const response = await apiClient.put('/Language/api/update', updatedLanguage);
        return response.data;
    } catch (error) {
        console.error('Error updating language:', error);
        throw error;
    }
};

export const deleteLanguage = async (id) => {
    try {
        const response = await apiClient.delete('/Language/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting language with ID ${id}:`, error);
        throw error;
    }
};
