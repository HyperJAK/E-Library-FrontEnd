import {getAllGenres} from './genreRequest';

export const fetchGenres = async () => {
    try {

        return await getAllGenres();

    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};
