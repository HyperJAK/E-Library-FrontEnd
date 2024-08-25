import { apiClient } from '../../server';

export const getAllSubscriptions = async () => {
    try {
        const response = await apiClient.get('/Subscription/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
    }
};

export const createSubscription = async (subscription) => {
    try {
        const response = await apiClient.post('/Subscription/api/create', subscription);
        return response.data;
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }
};

export const getSubscriptionById = async (id) => {
    try {
        const response = await apiClient.get(`/Subscription/api/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching subscription with ID ${id}:`, error);
        throw error;
    }
};

export const updateSubscription = async (subscription) => {
    try {
        const response = await apiClient.put('/Subscription/api/update', subscription);
        return response.data;
    } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }
};

export const deleteSubscription = async (id) => {
    try {
        const response = await apiClient.delete('/Subscription/api/delete', { data: { id } });
        return response.data;
    } catch (error) {
        console.error(`Error deleting subscription with ID ${id}:`, error);
        throw error;
    }
};
