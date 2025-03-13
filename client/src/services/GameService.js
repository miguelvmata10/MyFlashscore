import { apiRequest } from "./apiServices/apiService";

export const fetchGamesPerDay = (date) => {
    return apiRequest('game/gamesList', {
        params: {
            date: date
        }
    });
};

export const fetchGame = (fixtureID) => {
    return apiRequest(`game/${fixtureID}`);
}