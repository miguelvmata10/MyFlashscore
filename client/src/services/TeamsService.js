import { apiRequest } from "./apiServices/apiService";

export const fetchClubData = (teamID) => {
    return apiRequest(`/teams/info/${teamID}`);
};

export const fetchSquadInfo = (teamID) => {
    return apiRequest('/teams/squad', {params: {team: teamID}});
};

export const fetchTeamLeagues = (teamID) => {
    return apiRequest(`/teams/teamLeagues/${teamID}`);
};

export const fetchTeamStatistics = (teamID, league, season) => {
    return apiRequest(`/teams/teamStatistics/${teamID}`, {params: {
        league: league,
        season: season,
    }});
};

export const fetchTeamResults = (teamID, league, season) => {
    return apiRequest(`/teams/teamResults/${teamID}`, {params: {
        league: league,
        season: season,
    }});
};