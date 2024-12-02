import { apiRequest } from "./apiServices/apiService";

export const fetchSquadInfo = (teamID) => {
    return apiRequest('/teams/squad', {params: {team: teamID}});
};

export const fetchClubData = (teamID) => {
    return apiRequest(`/teams/info/${teamID}`);
};