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

export const fetchPlayerTransfers = (playerID) => {
    return apiRequest(`/people/playerTransfers/${playerID}`);
}

export const fetchPlayerTrophies = (playerID) => {
    return apiRequest(`/people/playerTrophies/${playerID}`);
}

export const fetchPlayerSeasons = (playerID) => {
    return apiRequest(`/people/playerSeasons/${playerID}`);
}

export const fetchPlayerStatistics = (playerID, season) => {
    return apiRequest(`/people/playerStatistics/${playerID}`, {params: {
        season: season,
    }});
}