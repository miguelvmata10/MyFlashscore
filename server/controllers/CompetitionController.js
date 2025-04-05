const fetchData = require('../utils/fetchData');

// Endpoint que retorna todas as ligas disponíveis na API
const getLeagues = async (req, res) => {
    fetchData('leagues', {}, res);
};

// Endpoint que retorna a liga de acordo com o seu id 
const getLeaguePerID = async (req, res) => {
    const leagueID = req.params.id;
    fetchData('leagues', { id: leagueID }, res);
};

// Endpoint que retorna a tabela classificativa de acordo com o id da liga e a season
const getLeagueStandings = async (req, res) => {
    const leagueID = req.params.id;
    const { season } = req.query;
    fetchData('standings', { league: leagueID, season: season }, res);
};

// Endpoint que retorna os melhores marcadores da liga numa determinada época
const getLeagueTopScorers = async (req, res) => {
    const leagueID = req.params.id;
    const { season } = req.query;
    fetchData('players/topscorers', {league: leagueID, season: season}, res);
};

// Endpoint que retorna os melhores assistentes da liga numa determinada época
const getLeagueTopAssists = async (req, res) => {
    const leagueID = req.params.id;
    const { season } = req.query;
    fetchData('players/topassists', { league: leagueID, season: season }, res);
};

const getLastLeagueGames = async (req, res) => {
    const leagueID = req.params.id;
    fetchData('fixtures', { league: leagueID, last: 20 }, res);
}

const getNextLeagueGames = async (req, res) => {
    const leagueID = req.params.id;
    fetchData('fixtures', { league: leagueID, next: 20 }, res);
}

const getLeagueRounds = async (req, res) => {
    const leagueID = req.params.id;
    const { season } = req.query;
    fetchData('fixtures/rounds', { league: leagueID, season: season }, res);
}

module.exports = {
    getLeagues,
    getLeaguePerID,
    getLeagueStandings,
    getLeagueTopScorers,
    getLeagueTopAssists,
    getLastLeagueGames,
    getNextLeagueGames,
    getLeagueRounds
};


