const axios = require('axios');
const redis = require('redis');
const { apiFootballKey, apiFootballHost } = require('./config');

// Flag para controlar se devemos tentar usar o Redis
let redisAvailable = false;
let client = null;
let redisErrorLogged = false; // Flag para controlar se já logamos o erro de conexão

// Inicialização do cliente Redis com um timeout
const initRedis = async () => {
  try {
    client = redis.createClient({
      url: 'redis://localhost:6379',
      // Adicionar timeout para conexão
      socket: {
        connectTimeout: 5000 // 5 segundos de timeout para conexão
      }
    });

    client.on('error', (err) => {
      if (!redisErrorLogged) {
        console.error('Erro Redis, cache desativado:', err.message);
        redisErrorLogged = true; // Marca que já logamos o erro
        redisAvailable = false;
      }
      // Não loga mais após o primeiro erro
    });

    // Listener para quando a conexão for restabelecida
    client.on('connect', () => {
      console.log('Redis reconectado!');
      redisAvailable = true;
      redisErrorLogged = false; // Reset do flag para permitir logs de erro novamente caso desconecte
    });

    // Tentar conectar com timeout
    await client.connect();
    redisAvailable = true;
    console.log('Redis conectado!');
  } catch (err) {
    // Apenas um log inicial informando que o Redis não está disponível
    console.error('Redis indisponível, aplicação funcionará sem cache:', err.message);
    redisAvailable = false;
  }
};

// Inicializar Redis, mas não esperar por ele para iniciar a aplicação
initRedis();

// Função para calcular o TTL até a próxima meia-noite
const getTTLUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.floor((nextMidnight - now) / 1000);
};

// Função de requisição para a API externa
const apiFootballReq = async (endpoint, params = {}) => {
  // Cria uma chave única que combina o endpoint e os parâmetros
  const cacheKey = `apiFootball:${endpoint}:${JSON.stringify(params)}`;
  let cacheData = null;
  
  // Tenta obter do cache apenas se o Redis estiver disponível
  if (redisAvailable && client && client.isOpen) {
    try {
      cacheData = await client.get(cacheKey);
      if (cacheData) {
        console.log(`Cache hit para: ${endpoint}`);
        return JSON.parse(cacheData);
      }
      console.log(`Cache miss para: ${endpoint}`);
    } catch (err) {
      // Silenciosamente continua sem cache se houver erro
      if (!redisErrorLogged) {
        console.error('Erro ao acessar o Redis, continuando sem cache');
        redisErrorLogged = true;
        redisAvailable = false;
      }
    }
  }

  // Caso não tenhamos dados do cache, faz a requisição à API
  console.log(`Requisição à API para: ${endpoint}`);
  
  const config = {
    method: 'get',
    url: `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`,
    headers: {
      'x-rapidapi-key': apiFootballKey,
      'x-rapidapi-host': apiFootballHost
    },
    params: params
  };

  try {
    const response = await axios(config);
    const data = response.data;

    // Tenta salvar no cache, mas só se o Redis estiver disponível
    if (redisAvailable && client && client.isOpen) {
      try {
        const ttl = getTTLUntilMidnight();
        await client.setEx(cacheKey, ttl, JSON.stringify(data));
        console.log(`Resposta guardada em cache para: ${endpoint}`);
      } catch (err) {
        // Ignora silenciosamente erros de escrita no cache
        if (!redisErrorLogged) {
          console.error('Erro ao escrever no cache, continuando sem cache');
          redisErrorLogged = true;
          redisAvailable = false;
        }
      }
    }

    return data;
  } catch (error) {
    console.error(`Erro no request para ${endpoint}:`, error);
    throw error;
  }
};

module.exports = apiFootballReq;