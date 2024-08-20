import { getAllFormats, getFormatById, createFormat, updateFormat, deleteFormat } from './formatRequest';

export const fetchAndFormatFormats = async () => {
    try {
        const formats = await getAllFormats();
        return formats.map(format => ({
            ...format,
            formattedDate: new Date(format.createdAt).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting formats:', error);
        throw error;
    }
};

export const fetchFormatWithSummary = async (id) => {
    try {
        const format = await getFormatById(id);
        return {
            ...format,
            summary: `Format "${format.name}" is available for books in different formats.`,
        };
    } catch (error) {
        console.error('Error fetching format with summary:', error);
        throw error;
    }
};

export const handleCreateFormat = async (newFormat) => {
    try {
        if (!newFormat.name) {
            throw new Error('Format name is required');
        }

        const response = await createFormat(newFormat);
        return response;
    } catch (error) {
        console.error('Error creating format:', error);
        throw error;
    }
};

export const handleUpdateFormat = async (updatedFormat) => {
    try {
        if (!updatedFormat.id) {
            throw new Error('Format ID is required for updating');
        }

        const response = await updateFormat(updatedFormat);
        return response;
    } catch (error) {
        console.error('Error updating format:', error);
        throw error;
    }
};

export const handleDeleteFormat = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this format?')) {
            return null;
        }

        const response = await deleteFormat(id);
        return response;
    } catch (error) {
        console.error('Error deleting format:', error);
        throw error;
    }
};
