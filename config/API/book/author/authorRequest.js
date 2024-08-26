import {apiClient} from '../../server'

export const fetchAllBookAuthors = async () => {
    try {
        const response = await apiClient.get('/BookAuthor/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all book authors:', error);
        throw error;
    }
};

export const fetchBookAuthorById = async (id) => {
    try {
        const response = await apiClient.get(`/BookAuthor/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book author with ID ${id}:`, error);
        throw error;
    }
};

export const createBookAuthor = async (newAuthor) => {
    try {
        const response = await apiClient.post('/BookAuthor/api/create', newAuthor);
        return response.data;
    } catch (error) {
        console.error('Error creating book author:', error);
        throw error;
    }
};

export const updateBookAuthor = async (modifiedAuthor) => {
    try {
        const response = await apiClient.put('/BookAuthor/api/update', modifiedAuthor);
        return response.data;
    } catch (error) {
        console.error('Error updating book author:', error);
        throw error;
    }
};

export const deleteBookAuthor = async (id) => {
    try {
        const response = await apiClient.delete('/BookAuthor/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting book author with ID ${id}:`, error);
        throw error;
    }
};
