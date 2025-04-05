import api from './api';

export const apiRequest = async (endpoint, options = {}) => {
    const { method = 'GET', params = {}, body = {} } = options;

    try {
        const response = await api({
            url: endpoint,
            method,
            params,
            data: body,
        });

        return response.data;
    } catch (error) {
        console.error(`Error while calling the "${endpoint}" endpoint:`, error);

        if (error.response && error.response.status === 404) {
            return [];
        }

        if (error.response && error.response.status === 500) {
            console.error('Internal server error. Please try again later.');
            // Throw a simple error message
            throw new Error('Internal server error. Please try again later.');
        }

        throw error;
    }
};