import { getUserById, createUser, updateUser, deleteUser } from './userRequest';

export const handleCreateUser = async (newUser) => {
    try {
        if (!newUser.username || !newUser.password) {
            throw new Error('Username and password are required');
        }

        const response = await createUser(newUser);
        return response;
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
