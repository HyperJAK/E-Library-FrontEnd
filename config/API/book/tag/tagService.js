import { getAllTags, getTagById, createTag, updateTag, deleteTag } from './tagRequest';

export const fetchAndFormatTags = async () => {
    try {
        const tags = await getAllTags();
        return tags.map(tag => ({
            ...tag,
            formattedDate: new Date(tag.createdAt).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting tags:', error);
        throw error;
    }
};

export const fetchTagWithSummary = async (id) => {
    try {
        const tag = await getTagById(id);
        return {
            ...tag,
            summary: `Tag "${tag.name}" is associated with books in various genres.`,
        };
    } catch (error) {
        console.error('Error fetching tag with summary:', error);
        throw error;
    }
};

export const handleCreateTag = async (newTag) => {
    try {
        if (!newTag.name) {
            throw new Error('Tag name is required');
        }

        const response = await createTag(newTag);
        return response;
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
};

export const handleUpdateTag = async (updatedTag) => {
    try {
        if (!updatedTag.id) {
            throw new Error('Tag ID is required for updating');
        }

        const response = await updateTag(updatedTag);
        return response;
    } catch (error) {
        console.error('Error updating tag:', error);
        throw error;
    }
};

export const handleDeleteTag = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this tag?')) {
            return null;
        }

        const response = await deleteTag(id);
        return response;
    } catch (error) {
        console.error('Error deleting tag:', error);
        throw error;
    }
};
