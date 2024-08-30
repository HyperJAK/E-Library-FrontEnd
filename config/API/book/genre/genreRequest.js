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
