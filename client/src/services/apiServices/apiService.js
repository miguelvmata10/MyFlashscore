import api from './api';

export const apiRequest = async (endpoint, options = {}) => {
    const {method = 'GET', params = {}, body = {}} = options;

    try {
        const response = await api({
            url: endpoint,
            method,
            params,
            data: body,
        });
        return response.data;
    } catch (error) {
        console.error(`Erro na chamada do endpoint "${endpoint}":`, error);
        throw error;
    }
};