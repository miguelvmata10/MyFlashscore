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

module.exports = {
    getCountries,
};