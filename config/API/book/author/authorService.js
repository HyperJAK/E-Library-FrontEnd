import {
    fetchAllBookAuthors,
    fetchBookAuthorById,
    createBookAuthor,
    updateBookAuthor,
    deleteBookAuthor
} from './authorRequest';

export const fetchAndFormatAuthors = async () => {
    try {
        const authors = await fetchAllBookAuthors();
        return authors.map(author => ({
            ...author,
            formattedBirthDate: author.birthDate ? new Date(author.birthDate).toLocaleDateString() : 'N/A',
        }));
    } catch (error) {
        console.error('Error fetching and formatting authors:', error);
        throw error;
    }
};

export const fetchAuthorWithSummary = async (id) => {
    try {
        const author = await fetchBookAuthorById(id);
        return {
            ...author,
            summary: `${author.firstName} ${author.lastName} was born on ${author.birthDate ? new Date(author.birthDate).toLocaleDateString() : 'N/A'}. Known for their work in ${author.genre}, they have contributed significantly to literature.`,
        };
    } catch (error) {
        console.error('Error fetching author with summary:', error);
        throw error;
    }
};

export const handleCreateAuthor = async (newAuthor) => {
    try {

        if (!newAuthor.firstName || !newAuthor.lastName) {
            throw new Error('First name and last name are required');
        }


        const response = await createBookAuthor(newAuthor);
        return response;
    } catch (error) {
        console.error('Error creating author:', error);
        throw error;
    }
};


export const handleUpdateAuthor = async (updatedAuthor) => {
    try {

        if (!updatedAuthor.id) {
            throw new Error('Author ID is required for updating');
        }


        const response = await updateBookAuthor(updatedAuthor);
        return response;
    } catch (error) {
        console.error('Error updating author:', error);
        throw error;
    }
};

export const handleDeleteAuthor = async (id) => {
    try {

        if (!window.confirm('Are you sure you want to delete this author?')) {
            return null;
        }


        const response = await deleteBookAuthor(id);
        return response;
    } catch (error) {
        console.error('Error deleting author:', error);
        throw error;
    }
};
