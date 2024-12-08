import { apiRequest } from "./apiServices/apiService";

export const fetchPlayerData = (playerID) => {
    return apiRequest(`/people/playerData/${playerID}`);
};