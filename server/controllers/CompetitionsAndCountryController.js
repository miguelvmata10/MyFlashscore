const apiFootballReq = require('../services/apiFootball');

// TODO: Refactor dos controladores, há muitos controladores com a mesma estrututura => ABSTRAIR


// Endpoint para ir buscar todos os países disponiveis
const getCountries = async (req, res) => {
    try {
        const data = await apiFootballReq('countries');
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro em adquirir os países: ", error.message);
        res.status(500).json({error: 'Erro no endpoint dos paises'})
    }
};

// Endpoint que retorna todas as ligas disponíveis na API
const getLeagues = async (req, res) => {
    try {
        const data = await apiFootballReq('leagues');
        res.status(200).json(data);
    } catch {
        console.error("Erro em adquirir as ligas: ", error.messasge);
        res.status(500).json({error: 'Erro no endpoint das ligas'})
    }
};

// Endpoint que retorna as ligas de um país consoante o code (ex: PT) do país
const getLeaguesPerCountry = async (req, res) => {
    const countryCode = req.query.code;
    console.log(countryCode);
    if (!countryCode) {
        return res.status(400).json({error: 'Não foi definido o code do respetivo país'});
    }

    try {
        const data = await apiFootballReq('leagues', {code: countryCode});

        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma liga com o respetivo código do país: ${countryCode}`});
        }

        res.status(200).json(data.response);
    } catch (error) {
        console.error('Erro ao obter as ligas: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna a liga de acordo com o seu id 
const getLeaguePerID = async (req, res) => {
    const leagueID = req.params.id;
    try {
        const data = await apiFootballReq('leagues', {id: leagueID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma liga com o id definido: ${leagueID}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter a liga: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint que retorna a tabela classificativa de acordo com o id da liga e a season
const getLeagueStandings = async (req, res) => {
    const { league, season } = req.query;
    try {
        const data = await apiFootballReq('standings' , {league: league, season: season});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma tabela classificativa com os dados: ${league} e ${season}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter a tabela classificativa da liga: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

const getLeagueTopScorers = async (req, res) => {
    const { league, season } = req.query;
    try {
        const data = await apiFootballReq('players/topscorers', {league: league, season: season});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma tabela classificativa com os dados: ${league} e ${season}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter a tabela classificativa da liga: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

const getLeagueTopAssists = async (req, res) => {
    const { league, season } = req.query;
    try {
        const data = await apiFootballReq('players/topassists', {league: league, season: season});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhuma tabela classificativa com os dados: ${league} e ${season}`})
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter a tabela classificativa da liga: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

module.exports = {
    getCountries,
    getLeagues,
    getLeaguesPerCountry,
    getLeaguePerID,
    getLeagueStandings,
    getLeagueTopScorers,
    getLeagueTopAssists,
};


