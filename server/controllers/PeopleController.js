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


module.exports = {
    getPlayerProfileByID,
}
