const fetchData = require('../utils/fetchData');

// Endpoint que retorna as informações de uma equipa de acordo com o seu id
const getTeamsInfo = (req, res) => {
    const teamID = req.params.id;
    fetchData('teams', { id: teamID }, res);
};

// Endpoint que retorna os jogadores de uma equipa de acordo com o id da equipa
const getSquadPlayers = (req, res) => {
    const { team } = req.query;
    fetchData('players/squads', { team: team }, res);
};

// Endpoint que retorna as ligas que uma determinada equipa está inserida 
const getTeamLeagues = (req, res) => {
    const team = req.params.teamID;
    fetchData('leagues', { team: team }, res);
};

// Endpoint que retorna as estatísticas de uma equipa
const getTeamStatistics = (req, res) => {
    const team = req.params.teamID;
    const { league, season } = req.query;
    fetchData('teams/statistics', { team: team, league: league, season: season }, res);
};

const getSquadResults = (req, res) => {
    const team = req.params.teamID;
    const { league, season } = req.query;
    fetchData('fixtures', { team: team, league: league, season: season }, res);
};

const getSquadHeadToHead = (req, res) => {
    const last = 10;
    const { h2h } = req.query;
    fetchData('fixtures/headtohead', { last: last, h2h: h2h }, res);
};

module.exports = {
    getTeamsInfo,
    getSquadPlayers,
    getTeamLeagues,
    getTeamStatistics,
    getSquadResults,
    getSquadHeadToHead,
}