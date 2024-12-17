import { apiRequest } from "./apiServices/apiService";

export const fetchAllLeagues = () => {
    return apiRequest('/competitions/leagues');
};

export const fetchLeagueData = (leagueID) => {
    return apiRequest(`/competitions/leagues/${leagueID}`);
};

export const fetchLeagueStanding = (leagueID, season) => {
    return apiRequest('/competitions/standings', {
        params: {
            league: leagueID,
            season: season
        }
    });
};

export const fetchTopScorers = (leagueID, season) => {
    return apiRequest('/competitions/league/topScorers', {
        params: {
            league: leagueID,
            season: season
        }
    });
};

export const fetchTopAssisters = (leagueID, season) => {
    return apiRequest('/competitions/league/topAssisters', {
        params: {
            league: leagueID,
            season: season
        }
    });
};






