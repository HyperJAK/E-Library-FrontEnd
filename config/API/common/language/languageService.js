import { getAllLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } from './languageRequest';

export const fetchAndFormatLanguages = async () => {
    try {
        const languages = await getAllLanguages();
        return languages.map(language => ({
            ...language,
            formattedDate: new Date(language.createdAt).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching and formatting languages:', error);
        throw error;
    }
};

export const fetchLanguageWithSummary = async (id) => {
    try {
        const language = await getLanguageById(id);
        return {
            ...language,
            summary: `The language "${language.name}" is used in the library.`,
        };
    } catch (error) {
        console.error('Error fetching language with summary:', error);
        throw error;
    }
};

export const handleCreateLanguage = async (newLanguage) => {
    try {
        if (!newLanguage.name) {
            throw new Error('Language name is required');
        }

        const response = await createLanguage(newLanguage);
        return response;
    } catch (error) {
        console.error('Error creating language:', error);
        throw error;
    }
};

export const handleUpdateLanguage = async (updatedLanguage) => {
    try {
        if (!updatedLanguage.id) {
            throw new Error('Language ID is required for updating');
        }

        const response = await updateLanguage(updatedLanguage);
        return response;
    } catch (error) {
        console.error('Error updating language:', error);
        throw error;
    }
};

export const handleDeleteLanguage = async (id) => {
    try {
        if (!window.confirm('Are you sure you want to delete this language?')) {
            return null;
        }

        const response = await deleteLanguage(id);
        return response;
    } catch (error) {
        console.error('Error deleting language:', error);
        throw error;
    }
};
