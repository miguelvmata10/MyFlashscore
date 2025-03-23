const apiFootballReq = require('../services/apiFootball');

// Endpoint que retorna os jogos e os seus detalhes num determinado dia
const getGamesPerDay = async (req, res) => {
    const { date } = req.query;
    try {
        const data = await apiFootballReq('fixtures', {date: date});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum jogo para a ${date}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter os jogos: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna o jogo através de um id
const getGameDetails = async (req, res) => {
    const fixtureID = req.params.id;
    try {
        const data = await apiFootballReq('fixtures', {id: fixtureID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum jogo com o id ${fixtureID}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter os jogos: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna os jogos de uma ronda de uma determinada liga
const getRoundGames = async (req, res) => {
    const leagueID = req.params.id;
    const { season, round } = req.query;
    
    try {
        const data = await apiFootballReq('fixtures', {league: leagueID, season: season, round: round});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum jogo com o id ${leagueID}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter os jogos: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

module.exports = {
    getGamesPerDay,
    getGameDetails,
    getRoundGames,
};