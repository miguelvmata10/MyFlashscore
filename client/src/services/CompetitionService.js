import { apiRequest } from "./apiServices/apiService";

export const fetchAllLeagues = () => {
    return apiRequest('/competitions/leagues');
};

export const fetchLeagueData = (leagueID) => {
    return apiRequest(`/competitions/leagues/${leagueID}`);
};

export const fetchLeagueStanding = (leagueID, season) => {
    return apiRequest(`/competitions/standings/${leagueID}`, {
        params: {
            season: season
        }
    });
};

export const fetchTopScorers = (leagueID, season) => {
    return apiRequest(`/competitions/league/topScorers/${leagueID}`, {
        params: {
            season: season
        }
    });
};

export const fetchTopAssisters = (leagueID, season) => {
    return apiRequest(`/competitions/league/topAssisters/${leagueID}`, {
        params: {
            season: season
        }
    });
};

export const fetchLeagueResults = (leagueID) => {
    return apiRequest(`/competitions/league/results/${leagueID}`);
};

export const fetchLeagueList = (leagueID) => {
    return apiRequest(`/competitions/league/list/${leagueID}`);
};






