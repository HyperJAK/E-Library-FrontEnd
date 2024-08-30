import {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    verifyUser,
    borrowBook,
    addUserSubscription, getUserBorrowedBooks, userLogOut, unborrowBook
} from './userRequest';
import {ValidEmail, ValidPassword, ValidUsername} from "@/config/Utilities";
import {forEach} from "react-bootstrap/ElementChildren";

export const handleVerifyUser = async (email, password) => {
    try {

        if(!ValidEmail(email) && !ValidPassword(password)){
            return "Invalid input"
        }

        if(!ValidEmail(email)){
            return "Invalid Email"
        }
        if(!ValidPassword(password)){
            return "Invalid Password"
        }

        const user = await verifyUser(email, password);
        return user;

    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
};

export const handleCreateUser = async (username, email, password) => {
    try {
        if(!ValidUsername(username) && !ValidEmail(email) && !ValidPassword(password)){
            return "Invalid input"
        }

        if(!ValidUsername(username)){
            return "Invalid Username"
        }
        if(!ValidEmail(email)){
            return "Invalid Email"
        }
        if(!ValidPassword(password)){
            return "Invalid Password"
        }
        const user = await createUser(username, email, password);
        console.log('got user not exiting service')
        return user;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const handleBorrowBook = async (userId, bookId) => {
    try {
        console.log('User id: ' + userId)
        console.log('Book id: ' + bookId)
        if (userId && bookId) {
            const response = await borrowBook(userId, bookId);
            return response;
        }
        else{
            console.error('User or book required');
            return {
                "message": "User was not found, please login"
            }
        }
    } catch (error) {
        console.error('Error borrowing book:', error);
    }
};

export const handleUnborrowBook = async (userId, bookId) => {
    try {
        console.log('User id: ' + userId)
        console.log('Book id: ' + bookId)
        if (userId && bookId) {
            const response = await unborrowBook(userId, bookId);
            return response;
        }
        else{
            console.error('User or book required');
            return {
                "message": "User was not found, please login"
            }
        }
    } catch (error) {
        console.error('Error unborrowing book:', error);
    }
};

export const handleUpdateUser = async (updatedUser) => {
    try {
        if (!updatedUser.id) {
            return {
                "message": "User ID is required for updating"
            }
        }

        const response = await updateUser(updatedUser);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const handleGetUserById = async (id) => {
    try {
        const user = await getUserById(id);


        if(user.userBooks.length > 0){
            user.userBooks.forEach((book) => {
                //changing borrowed date and due date from Datetime format to normal Date
                const borrowedDate = new Date(book.borrowedDate);
                const normalDate = borrowedDate.toLocaleDateString('en-CA');

                const dueDate = new Date(book.dueDate);
                const normalDueDate = dueDate.toLocaleDateString('en-CA');

                book.borrowedDate = normalDate;
                book.dueDate = normalDueDate;
            });
        }


        return user;

    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export const handleAddSubscription = async (userId, subscriptionId) => {
    try {
        const response = await addUserSubscription(userId, subscriptionId);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const handleUserLogOut = async (id) => {
    try {
        const response = await userLogOut(id);
        return response;
    } catch (error) {
        console.error('Error logging user Out:', error);
        throw error;
    }
};

export const handleDeleteUser = async (id) => {
    try {
        const response = await deleteUser(id);
        return response;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
