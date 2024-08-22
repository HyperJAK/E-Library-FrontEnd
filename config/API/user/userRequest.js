import {apiClient} from '../server'
import {HashPassword} from "@/config/Utilities";

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/User/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

//this is sign in
export const verifyUser = async (email, password) => {
    try {
        const verificationObject = {
            'email': email,
            'password': await HashPassword(password)
        }

        const response = await apiClient.post(`/User/api/verifyUser`, verificationObject);
        return response.data;

    } catch (error) {
        console.error(`Wrong credentials or user doesnt exist`, error);
        throw error;
    }
};

//this is sign up
export const createUser = async (username, email, password) => {
    try {
        const newUser = {
            'username': username,
            'email': email,
            'password': await HashPassword(password),
            'timeStamp': new Date().toISOString()
        }

        const response = await apiClient.post('/User/api/create', newUser);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (updatedUser) => {
    try {
        const response = await apiClient.put('/User/api/update', updatedUser);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete('/User/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};
