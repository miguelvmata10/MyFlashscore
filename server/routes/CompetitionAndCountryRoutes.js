// /api/competitions

const express = require('express');
const router = express.Router();
const competitionAndCountryController = require("../controllers/CompetitionsAndCountryController");

// rota para obter a lista de países
router.get('/countries', competitionAndCountryController.getCountries);

// rota para obter todas as ligas
router.get('/leagues', competitionAndCountryController.getLeagues);

// rota para obter as ligas de um determinado país 
router.get('/countries/leagues', competitionAndCountryController.getLeaguesPerCountry);

// rota para obter a liga com o id 'id'
router.get('/leagues/:id', competitionAndCountryController.getLeaguePerID);

// rota para obter a classificação da liga através do id da liga e do ano
router.get('/standings/:id', competitionAndCountryController.getLeagueStandings);

// rota que retorna os melhores marcadores de uma determinada liga através do id e do ano
router.get('/league/topScorers/:id', competitionAndCountryController.getLeagueTopScorers);

// rota que retorna os melhores assistentes de uma determinada liga através do id e do ano
router.get('/league/topAssisters/:id', competitionAndCountryController.getLeagueTopAssists);

// rota que retorna os últimos 20 jogos da respetiva liga 
router.get('/league/results/:id', competitionAndCountryController.getLastLeagueGames);

// rota que retorna os próximos 20 jogos da respetiva liga
router.get('/league/list/:id', competitionAndCountryController.getNextLeagueGames);

// rota que retorna as rondas da respetiva liga
router.get('/league/rounds/:id', competitionAndCountryController.getLeagueRounds);

module.exports = router;
