import { apiRequest } from "./apiServices/apiService";

export const fetchSearchPlayers = () => {
    return apiRequest('/search/players');
};