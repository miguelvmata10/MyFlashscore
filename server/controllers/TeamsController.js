const apiFootballReq = require('../services/apiFootball');

// Endpoint que retorna as informações de uma equipa de acordo com o seu id
const getTeamsInfo = async (req, res) => {
    const teamID = req.params.id;
    try {
        const data = await apiFootballReq('teams', {id: teamID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum clube com o id definido: ${teamID}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter o clube: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna os jogadores de uma equipa de acordo com o id da equipa
const getSquadPlayers = async (req, res) => {
    const { team } = req.query;
    try {
        const data = await apiFootballReq('players/squads', {team: team});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma equipa com o id definido: ${team}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter o clube: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna as ligas que uma determinada equipa está inserida 
const getTeamLeagues = async (req, res) => {
    const team = req.params.teamID;
    try {
        const data = await apiFootballReq('leagues', {team: team});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum dado encontrado em: ${team}.`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter as ligas: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

const getTeamStatistics = async (req, res) => {
    const team = req.params.teamID;
    const { league, season } = req.query;
    try {
        const data = await apiFootballReq('teams/statistics', {
            team: team,
            league: league,
            season: season});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Não há dados estatisticos para a equipa ${team} na liga ${league} em ${season}.`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter as estatisticas da equipa: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
}

const getSquadResults = async (req, res) => {
    const team = req.params.teamID;
    const { league, season } = req.query;
    try {
        const data = await apiFootballReq('fixtures', {
            team: team,
            league: league,
            season: season});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Não há resultados para a equipa ${team} na liga ${league} em ${season}.`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter os resultados da equipa: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
}

module.exports = {
    getTeamsInfo,
    getSquadPlayers,
    getTeamLeagues,
    getTeamStatistics,
    getSquadResults,
}