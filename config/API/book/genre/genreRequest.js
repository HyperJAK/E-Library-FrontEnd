import {apiClient} from '../../server'

export const getAllGenres = async () => {
    try {
        const response = await apiClient.get('/BookGenre/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all genres:', error);
        throw error;
    }
};

export const getGenreById = async (id) => {
    try {
        const response = await apiClient.get(`/BookGenre/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching genre with ID ${id}:`, error);
        throw error;
    }
};

export const createGenre = async (newGenre) => {
    try {
        const response = await apiClient.post('/BookGenre/api/create', newGenre);
        return response.data;
    } catch (error) {
        console.error('Error creating genre:', error);
        throw error;
    }
};

export const updateGenre = async (updatedGenre) => {
    try {
        const response = await apiClient.put('/BookGenre/api/update', updatedGenre);
        return response.data;
    } catch (error) {
        console.error('Error updating genre:', error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await apiClient.delete('/BookGenre/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting genre with ID ${id}:`, error);
        throw error;
    }
};

export const clearGenreCache = async () => {
    try {
        const response = await apiClient.delete('/BookGenre/api/clearCache');
        return response.data;
    } catch (error) {
        console.error('Error clearing genre cache:', error);
        throw error;
    }
};
