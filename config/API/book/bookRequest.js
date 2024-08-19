import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:5227',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getAllBooks = async () => {
    try {
        const response = await apiClient.get('/Book/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching all books:', error);
        throw error;
    }
};


export const getBookById = async (id) => {
    try {
        const response = await apiClient.get(`/Book/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        throw error;
    }
};


export const createBook = async (newBook) => {
    try {
        const response = await apiClient.post('/Book/api/create', newBook);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};


export const updateBook = async (updatedBook) => {
    try {
        const response = await apiClient.put('/Book/api/update', updatedBook);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};


export const deleteBook = async (id) => {
    try {
        const response = await apiClient.delete('/Book/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error);
        throw error;
    }
};


export const clearBookCache = async () => {
    try {
        const response = await apiClient.delete('/Book/api/clearCache');
        return response.data;
    } catch (error) {
        console.error('Error clearing book cache:', error);
        throw error;
    }
};
