import { getAllSubscriptions, createSubscription, getSubscriptionById, updateSubscription, deleteSubscription } from './subscriptionRequest';

export const handleGetAllSubscriptions = async () => {
    try {
        const subscriptions = await getAllSubscriptions();
        return subscriptions;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
    }
};

export const handleCreateSubscription = async (subscription) => {
    try {
        const createdSubscription = await createSubscription(subscription);
        return createdSubscription;
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }
};

export const handleGetSubscriptionById = async (id) => {
    try {
        const subscription = await getSubscriptionById(id);
        return subscription;
    } catch (error) {
        console.error(`Error fetching subscription with ID ${id}:`, error);
        throw error;
    }
};

export const handleUpdateSubscription = async (subscription) => {
    try {
        if (!subscription.id) {
            return { "message": "Subscription ID is required for updating" };
        }
        const updatedSubscription = await updateSubscription(subscription);
        return updatedSubscription;
    } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }
};

export const handleDeleteSubscription = async (id) => {
    try {
        const response = await deleteSubscription(id);
        return response;
    } catch (error) {
        console.error('Error deleting subscription:', error);
        throw error;
    }
};
