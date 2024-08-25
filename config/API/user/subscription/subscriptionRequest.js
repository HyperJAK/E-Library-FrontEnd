import {apiClient} from '../../server';

export const getAllSubscriptions = async () => {
    try {
        const response = await apiClient.get('/Subscription/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
    }
};