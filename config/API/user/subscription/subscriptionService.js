import {getAllSubscriptions} from './subscriptionRequest';

export const handleGetAllSubscriptions = async () => {
    try {
        const subscriptions = await getAllSubscriptions();
        return subscriptions;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
    }
};
