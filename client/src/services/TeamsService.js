import { apiRequest } from "./apiServices/apiService";

export const fetchClubData = (teamID) => {
    return apiRequest(`/teams/info/${teamID}`);
};

export const fetchSquadInfo = (teamID) => {
    return apiRequest('/teams/squad', {params: {team: teamID}});
};

export const fetchTeamCoach = (teamID) => {
    return apiRequest('/teams/coach', {params: {team: teamID}});
};
