require('dotenv').config(); // ir buscar os dados da api-key e api-host

const config = {
    apiFootballKey: process.env.API_FOOTBALL_KEY,
    apiFootballHost: process.env.API_FOOTBALL_HOST
};

module.exports = config;