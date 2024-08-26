import {apiClient} from '../../server'

export const getAllTags = async () => {
    try {
        const response = await apiClient.get('/BookTag/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all tags:', error);
        throw error;
    }
};

export const getTagById = async (id) => {
    try {
        const response = await apiClient.get(`/BookTag/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tag with ID ${id}:`, error);
        throw error;
    }
};

export const createTag = async (newTag) => {
    try {
        const response = await apiClient.post('/BookTag/api/create', newTag);
        return response.data;
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
};

export const updateTag = async (updatedTag) => {
    try {
        const response = await apiClient.put('/BookTag/api/update', updatedTag);
        return response.data;
    } catch (error) {
        console.error('Error updating tag:', error);
        throw error;
    }
};

export const deleteTag = async (id) => {
    try {
        const response = await apiClient.delete('/BookTag/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting tag with ID ${id}:`, error);
        throw error;
    }
};
