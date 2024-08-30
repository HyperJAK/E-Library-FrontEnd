import {apiClient} from '../server'
import {GetSessionID, HashPassword, StoreSessionID, StoreUser} from "@/config/Utilities";

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

        const response = await apiClient.post(`/User/api/verifyUser`, verificationObject)

        const sessionId = response.headers["x-session-id"]
        console.log(response)
        if (sessionId) {
            await StoreSessionID(sessionId);

            return response.data;
        } else {
            console.error('Session ID not found in response headers');
        }

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

        const request = {
            'entityObject': newUser
        }

        const response = await apiClient.post('/User/api/create', request)

        const sessionId = response.headers["x-session-id"]
        if (sessionId) {
            await StoreSessionID(sessionId);

            console.log(response.data)
            return response.data;
        } else {
            console.error('Session ID not found in response headers');
        }

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const borrowBook = async (userId, bookId) => {
    try {
        const sessionId = await GetSessionID()
        const requestData = {
            'userId': userId,
            'bookId': bookId,
            'sessionId': sessionId
        }

        const response = await apiClient.post('/User/api/borrowBook', requestData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const unborrowBook = async (userId, bookId) => {
    try {
        console.log('userid is: ' + userId + 'and book id is: ' + bookId)
        const sessionId = await GetSessionID()
        const requestData = {
            'userId': userId,
            'bookId': bookId,
            'sessionId': sessionId
        }

        const response = await apiClient.post('/User/api/unborrowBook', requestData);
        return response.data;
    } catch (error) {
        console.error('Error unborrowing book:', error);
    }
};

export const updateUser = async (updatedUser) => {
    try {
        const sessionId = await GetSessionID()
        const request = {
            'entityObject': updatedUser,
            'sessionID': sessionId
        }

        const response = await apiClient.put('/User/api/update', request);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const userLogOut = async (id) => {
    try {
        const sessionId = await GetSessionID()
        const request = {
            'id': id,
            'sessionID': sessionId
        }

        const response = await apiClient.post('/User/api/logOut', request);
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
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
