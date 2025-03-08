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

module.exports = {
    getGamesPerDay,
};