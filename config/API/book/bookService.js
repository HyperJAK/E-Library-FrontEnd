import {
    clearBookCache,
    createBook,
    deleteBook,
    getAllBooks,
    getBookById, getBookSearchResults,
    getBookSuggestions, getBookWithGenre,
    updateBook
} from './bookRequest';
import {getUserBorrowedBooks} from "@/config/API/book/bookRequest";

export const fetchAndFormatBooks = async () => {
    try {
        const books = await getAllBooks();
        return books.map(book => ({
            ...book,
            formattedDate: new Date(book.publishingDate).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting books:', error);
        throw error;
    }
};

export const fetchBook = async (id) => {
    try {
        const book = await getBookById(id);
        return book;
    } catch (error) {
        console.error('Error fetching book with summary:', error);
        throw error;
    }
};

export const fetchBorrowedBooks = async (userId) => {
    try {
        const books = await getUserBorrowedBooks(userId);
        return books;
    } catch (error) {
        console.error(`Error fetching borrowed books for user with ID: ${userId}`, error);
        throw error;
    }
};

export const handleCreateBook = async (newBook) => {
    try {
        if (!newBook.title || !newBook.author) {
            throw new Error('Title and author are required');
        }

        const response = await createBook(newBook);
        return response;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};


export const handleUpdateBook = async (updatedBook) => {
    try {

        if (!updatedBook.id) {
            throw new Error('Book ID is required for updating');
        }

        const response = await updateBook(updatedBook);
        return response;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};


export const handleDeleteBook = async (id) => {
    try {

        if (!window.confirm('Are you sure you want to delete this book?')) {
            return null;
        }


        const response = await deleteBook(id);
        return response;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};


export const handleClearCache = async (bookId) => {
    try {
        const key = `Book_${bookId}`
        const response = await clearBookCache(key);
        return response;
    } catch (error) {
        console.error('Error clearing book cache:', error);
        throw error;
    }
};


export const fetchBookSuggestions = async (name) => {
    try {
        return await getBookSuggestions(name);
    } catch (error) {
        console.error('Error fetching book suggestions:', error);
        throw error;
    }

}

export const fetchBookSearchResults = async (name) => {
    try {
        return await getBookSearchResults(name);
    } catch (error) {
        console.error('Error fetching book search results:', error);
        throw error;
    }

}

export const fetchBooksWithGenre = async (id) => {
    try {
        return await getBookWithGenre(id);
    } catch (error) {
        console.error('Error fetching book search results:', error);
        throw error;
    }

}
