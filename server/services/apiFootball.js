const axios = require('axios');
const redis = require('redis'); // redis para cache
const { apiFootballKey, apiFootballHost } = require('./config');


const client = redis.createClient({
  url: 'redis://localhost:6379'
});

client.connect()
  .then(() => console.log('Redis conectado!'))
  .catch(err => console.error('Erro ao conectar com o Redis: ', err));

// Função de requisição para a API externa
const apiFootballReq = async (endpoint, params = {}) => {

    // cria uma chave única que combina o endpoint e os parâmetros
    const cacheKey = `apiFootball:${endpoint}:${JSON.stringify(params)}`;

    try {
      const cacheData = await client.get(cacheKey);

      // se os dados estão em cache, retorna esses dados
      if (cacheData) {
        console.log('Resposta já estava em cache!');
        return JSON.parse(cacheData);
      }

      const config = {
        method: 'get',
        url: `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`,
        headers: {
          'x-rapidapi-key': apiFootballKey,
          'x-rapidapi-host': apiFootballHost
        },
        params: params
      };

      const response = await axios(config);
      const data = response.data;

      // Armazena a resposta na cache com TTL de 24 horas (86400 segundos)
      await client.set(cacheKey, JSON.stringify(data), {
        EX: 86400  
      });
      console.log("Resposta guardada na cache com um TTL de 24 horas");

      return data;
    } 
    catch (error) {
      console.error('Erro no request:', error);
      throw error;
    }
};

module.exports = apiFootballReq;