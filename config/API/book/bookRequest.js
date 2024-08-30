import {apiClient} from '../server'


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

export const getUserBorrowedBooks = async (userId) => {
    try {
        const response = await apiClient.get(`/Book/api/borrowedBooks/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching borrowed books for user with ID: ${userId}:`, error);
        throw error;
    }
};


export const clearBookCache = async (key) => {
    try {
        const response = await apiClient.delete(`/Book/api/clearCache?key=${key}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing book cache:', error);
        throw error;
    }
};

export const getBookSuggestions = async (name) => {
    try {
        const response = await apiClient.get(`/Book/api/getSuggestions/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error getting book suggestions:', error);
        throw error;
    }

};

export const getBookSearchResults = async (name) => {
    try {
        const response = await apiClient.get(`/Book/api/getSearchResults/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error getting book search results:', error);
        throw error;
    }

};

export const getBookWithGenre = async (id) => {
    try {
        const response = await apiClient.get(`/Book/api/getBooksByGenre/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting book search results:', error);
        throw error;
    }

};



