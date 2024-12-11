const apiFootballReq = require('../services/apiFootball');

// Endpoint para ir buscar os jogadores de acordo com uma string 
const getSearchPlayers = async (req, res) => {
    const playerName = req.params.inputValue;
    const page = req.query.page || 1;

    try {
        const data = await apiFootballReq('players/profiles', {search: playerName, page: page});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum resultado para jogadores com o nome: ${playerName}`});
        }
        res.status(200).json({
            players: data.response,
            pagination: {
                currentPage: page,
                totalPages: data.paging.total,
                totalResults: data.results,
            },
        });
    } catch (error) {
        console.error('Erro ao obter os jogadores: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

// Endpoint para ir buscar os treinadores de acordo com uma string 
const getSearchCoach = async (req, res) => {
    try {
        const data = await apiFootballReq('countries');
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro em adquirir os países: ", error.message);
        res.status(500).json({error: 'Erro no endpoint dos paises'})
    }
};

// Endpoint para ir buscar os clubes de acordo com uma string 
const getSearchClub = async (req, res) => {
    try {
        const data = await apiFootballReq('countries');
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro em adquirir os países: ", error.message);
        res.status(500).json({error: 'Erro no endpoint dos paises'})
    }
};

// Endpoint para ir buscar as competições de acordo com uma string 
const getSearchLeague = async (req, res) => {
    try {
        const data = await apiFootballReq('countries');
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro em adquirir os países: ", error.message);
        res.status(500).json({error: 'Erro no endpoint dos paises'})
    }
};

module.exports = {
    getSearchPlayers,
    getSearchCoach,
    getSearchClub,
    getSearchLeague,
}