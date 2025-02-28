const apiFootballReq = require('../services/apiFootball');

const getPlayerProfileByID = async (req, res) => {
    const playerID = req.params.id;
    try {
        const data = await apiFootballReq('players/profiles', {player: playerID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum jogador com o id definido: ${playerID}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter o jogador: ', error);
        res.status(500).json({error: 'Erro interno do servidor'}); 
    }
};

const getCoachProfileByID = async (req, res) => {
    const coachID = req.params.id;
    try {
        const data = await apiFootballReq('coachs', {id: coachID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum treinador com o id definido: ${coachID}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter o treinador: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
}

const getCoachTrophies = async (req, res) => {
    const coachID = req.params.id;
    try {
        const data = await apiFootballReq('trophies', {coach: coachID});
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({error: `Nenhum treinador com o id definido: ${coachID}`});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter o jogador: ', error);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
}


module.exports = {
    getPlayerProfileByID,
    getCoachProfileByID,
    getCoachTrophies,
}
