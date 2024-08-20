import { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre, clearGenreCache } from './genreRequest';

export const fetchAndFormatGenres = async () => {
    try {
        const genres = await getAllGenres();
        return genres.map(genre => ({
            ...genre,
            formattedDate: new Date(genre.createdAt).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting genres:', error);
        throw error;
    }
};

export const fetchGenreWithSummary = async (id) => {
    try {
        const genre = await getGenreById(id);
        return {
            ...genre,
            summary: `${genre.name} is a popular genre in the book collection.`,
        };
    } catch (error) {
        console.error('Error fetching genre with summary:', error);
        throw error;
    }
};

export const handleCreateGenre = async (newGenre) => {
    try {
        if (!newGenre.name) {
            throw new Error('Genre name is required');
        }

        const response = await createGenre(newGenre);
        return response;
    } catch (error) {
        console.error('Error creating genre:', error);
        throw error;
    }
};

export const handleUpdateGenre = async (updatedGenre) => {
    try {
        if (!updatedGenre.id) {
            throw new Error('Genre ID is required for updating');
        }

        const response = await updateGenre(updatedGenre);
        return response;
    } catch (error) {
        console.error('Error updating genre:', error);
        throw error;
    }
};

export const handleDeleteGenre = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this genre?')) {
            return null;
        }

        const response = await deleteGenre(id);
        return response;
    } catch (error) {
        console.error('Error deleting genre:', error);
        throw error;
    }
};

export const handleClearCache = async () => {
    try {
        const response = await clearGenreCache();
        return response;
    } catch (error) {
        console.error('Error clearing genre cache:', error);
        throw error;
    }
};
