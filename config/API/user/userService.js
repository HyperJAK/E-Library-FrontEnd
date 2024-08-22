import {getUserById, createUser, updateUser, deleteUser, verifyUser} from './userRequest';
import {ValidEmail, ValidPassword, ValidUsername} from "@/config/Utilities";

export const handleVerifyUser = async (email, password) => {
    try {
        if(ValidEmail(email) && ValidPassword(password)){
            const user = await verifyUser(email, password);
            return user;
        }
        else{
            console.error('Email or password empty');
            return null;
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
};

export const handleCreateUser = async (username, email, password) => {
    try {
        if (ValidUsername(username) && ValidEmail(email) && ValidPassword(password)) {
            const user = await createUser(username, email, password);
            return user;
        }
        else{
            console.error('Email or password empty');
            return null;
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const handleUpdateUser = async (updatedUser) => {
    try {
        if (!updatedUser.id) {
            throw new Error('User ID is required for updating');
        }

        const response = await updateUser(updatedUser);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const handleGetUserById = async (id) => {
    try {
        const user = await getUserById(id);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
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
