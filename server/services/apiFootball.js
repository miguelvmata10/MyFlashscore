const axios = require('axios');
const redis = require('redis'); // redis para cache
require('dotenv').config(); // ir buscar os dados da api-key e api-host

const client = redis.createClient({
  url: 'redis://localhost:6379'
});

client.connect()
  .then(() => console.log('Redis conectado!'))
  .catch(err => console.error('Erro ao conectar com o Redis: ', err));

// Função de requisição para a API externa
const apiFootballReq = async (endpoint, params = {}) => {

    // cria uma chave única que combina o endpoint e os parâmetros
    const cackeKey = `apiFootball:${endpoint}:${JSON.stringify(params)}`;

    try {
      const cacheData = await client.get(cackeKey);

      // se os dados estão em cache, retorna esses dados
      if (cacheData) {
        console.log('Resposta já estava em cache!');
        return JSON.parse(cacheData);
      }

      const config = {
        method: 'get',
        url: `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`,
        headers: {
          'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
          'x-rapidapi-host': process.env.API_FOOTBALL_HOST
        },
        params: params
      };

      const response = await axios(config);
      const data = response.data;

      // guarda a resposta na cache de forma persistente
      await client.set(cackeKey, JSON.stringify(data));
      console.log("Resposta guardada na cache.");

      return data;
    } 
    catch (error) {
      console.error('Erro no request:', error);
      throw error;
    }
};

module.exports = apiFootballReq;