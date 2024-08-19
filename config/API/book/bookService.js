import { getAllBooks, getBookById, createBook, updateBook, deleteBook, clearBookCache } from './bookRequest';

// Function to fetch all books and format their published dates
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

// Function to fetch a single book by ID and add a calculated field (e.g., a summary)
export const fetchBookWithSummary = async (id) => {
    try {
        const book = await getBookById(id);
        return {
            ...book,
            summary: `${book.title} by ${book.author} is a ${book.genre} book published on ${new Date(book.publishedDate).toLocaleDateString()}.`,
        };
    } catch (error) {
        console.error('Error fetching book with summary:', error);
        throw error;
    }
};

// Function to handle creating a new book with additional validation or manipulation
export const handleCreateBook = async (newBook) => {
    try {
        // Example: Validate that the book title is not empty
        if (!newBook.title || !newBook.author) {
            throw new Error('Title and author are required');
        }

        // Send the data to the API
        const response = await createBook(newBook);
        return response;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Function to handle updating a book with additional data checks
export const handleUpdateBook = async (updatedBook) => {
    try {
        // Example: Check if the book exists first (optional, could use getBookById for this)
        if (!updatedBook.id) {
            throw new Error('Book ID is required for updating');
        }

        // Send the data to the API
        const response = await updateBook(updatedBook);
        return response;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Function to delete a book and handle any necessary cleanup
export const handleDeleteBook = async (id) => {
    try {
        // Confirm before deleting (could be handled in the UI layer as well)
        if (!window.confirm('Are you sure you want to delete this book?')) {
            return null;
        }

        // Send the delete request to the API
        const response = await deleteBook(id);
        return response;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

// Function to clear the book cache with some additional logic if needed
export const handleClearCache = async () => {
    try {
        const response = await clearBookCache();
        return response;
    } catch (error) {
        console.error('Error clearing book cache:', error);
        throw error;
    }
};
