const apiFootballReq = require('../services/apiFootball');

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

        if (!data.response || data.response.lenght === 0) {
            return res.status(404).json({error: `Nenhuma liga com o respetivo código do país: ${countryCode}`});
        }

        res.status(200).json(data.response);
    } catch (error) {
        console.error('Erro ao obter as ligas: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};


module.exports = {
    getCountries,
    getLeagues,
    getLeaguesPerCountry,
};


