import {apiClient} from '../server'
import {HashPassword, StoreSessionID, StoreUser} from "@/config/Utilities";

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/User/api/data/${id}`);
        await StoreUser(response.data)

        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw error;
    }
};

export const addUserSubscription = async (userId, subscriptionId) => {
    try {
        const requestData = {
            'userId': userId,
            'subscriptionId': subscriptionId
        }

        const response = await apiClient.post(`/User/api/addSubscription`, requestData);
        return response.data;
    } catch (error) {
        console.error(`Error subscription id: ${subscriptionId}:`, error);
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

        const response = await apiClient.post(`/User/api/verifyUser`, verificationObject).then(async response => {
            const sessionId = response.headers['x-session-id'];
            await StoreSessionID(sessionId);
        })
            .catch(error => {
                console.error('Error:', error);
            });;;
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

        const response = await apiClient.post('/User/api/create', newUser).then(async response => {
            const sessionId = response.headers['x-session-id'];
            await StoreSessionID(sessionId);
        })
            .catch(error => {
                console.error('Error:', error);
            });;
        return response.data;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const borrowBook = async (userId, bookId) => {
    try {
        const requestData = {
            'userId': userId,
            'bookId': bookId
        }

        const response = await apiClient.post('/User/api/borrowBook', requestData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
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
