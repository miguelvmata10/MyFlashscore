// /api/competitions

const express = require('express');
const router = express.Router();
const competitionController = require("../controllers/CompetitionController");

// rota para obter todas as ligas
router.get('/leagues', competitionController.getLeagues);

// rota para obter a liga com o id 'id'
router.get('/leagues/:id', competitionController.getLeaguePerID);

// rota para obter a classificação da liga através do id da liga e do ano
router.get('/standings/:id', competitionController.getLeagueStandings);

// rota que retorna os melhores marcadores de uma determinada liga através do id e do ano
router.get('/league/topScorers/:id', competitionController.getLeagueTopScorers);

// rota que retorna os melhores assistentes de uma determinada liga através do id e do ano
router.get('/league/topAssisters/:id', competitionController.getLeagueTopAssists);

// rota que retorna os últimos 20 jogos da respetiva liga 
router.get('/league/results/:id', competitionController.getLastLeagueGames);

// rota que retorna os próximos 20 jogos da respetiva liga
router.get('/league/list/:id', competitionController.getNextLeagueGames);

// rota que retorna as rondas da respetiva liga
router.get('/league/rounds/:id', competitionController.getLeagueRounds);

module.exports = router;
