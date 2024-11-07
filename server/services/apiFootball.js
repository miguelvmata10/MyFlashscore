const axios = require('axios');
require('dotenv').config(); // ir buscar os dados da api-key e api-host
console.log(process.env.API_FOOTBALL_KEY, process.env.API_FOOTBALL_HOST);

// Função de requisição para a API externa
const apiFootballReq = async (endpoint, params = {}) => {
    const config = {
        method: 'get',
        url: `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`,
        headers: {
          'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
          'x-rapidapi-host': process.env.API_FOOTBALL_HOST
        },
        params: params
      };
      
      try {
        const response = await axios(config);
        return response.data;
      } catch (error) {
        console.error('Erro no request:', error);
        throw error;
      }
};

module.exports = apiFootballReq;