import { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } from './locationRequest';

export const fetchAndFormatLocations = async () => {
    try {
        const locations = await getAllLocations();
        return locations.map(location => ({
            ...location,
            formattedDate: new Date(location.createdAt).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting locations:', error);
        throw error;
    }
};

export const fetchLocationWithSummary = async (id) => {
    try {
        const location = await getLocationById(id);
        return {
            ...location,
            summary: `Location "${location.name}" is used to store books in the library.`,
        };
    } catch (error) {
        console.error('Error fetching location with summary:', error);
        throw error;
    }
};

export const handleCreateLocation = async (newLocation) => {
    try {
        if (!newLocation.name) {
            throw new Error('Location name is required');
        }

        const response = await createLocation(newLocation);
        return response;
    } catch (error) {
        console.error('Error creating location:', error);
        throw error;
    }
};

export const handleUpdateLocation = async (updatedLocation) => {
    try {
        if (!updatedLocation.id) {
            throw new Error('Location ID is required for updating');
        }

        const response = await updateLocation(updatedLocation);
        return response;
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
};

export const handleDeleteLocation = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this location?')) {
            return null;
        }

        const response = await deleteLocation(id);
        return response;
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
};
