const fetchData = require('../utils/fetchData');

// Endpoint que retorna os jogos e os seus detalhes num determinado dia
const getGamesPerDay = (req, res) => {
    const { date } = req.query;
    fetchData('fixtures', { date: date }, res);
};

// Endpoint que retorna o jogo através de um id
const getGameDetails = (req, res) => {
    const fixtureID = req.params.id;
    fetchData('fixtures', { id: fixtureID }, res);
};

// Endpoint que retorna os jogos de uma ronda de uma determinada liga
const getRoundGames = (req, res) => {
    const leagueID = req.params.id;
    const { season, round } = req.query;
    fetchData('fixtures', { league: leagueID, season: season, round: round }, res);
};

module.exports = {
    getGamesPerDay,
    getGameDetails,
    getRoundGames,
};