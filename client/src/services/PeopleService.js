import { apiRequest } from "./apiServices/apiService";

export const fetchPlayerData = (playerID) => {
    return apiRequest(`/people/playerData/${playerID}`);
};

export const fetchCoachData = (coachID) => {
    return apiRequest(`/people/coachData/${coachID}`);
}