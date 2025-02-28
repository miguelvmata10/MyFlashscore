import { apiRequest } from "./apiServices/apiService";

export const fetchPlayerData = (playerID) => {
    return apiRequest(`/people/playerData/${playerID}`);
};

export const fetchCoachData = (coachID) => {
    return apiRequest(`/people/coachData/${coachID}`);
}

export const fetchCoachTrophies = (coachID) => {
    return apiRequest(`/people/coachTrophies/${coachID}`);
}