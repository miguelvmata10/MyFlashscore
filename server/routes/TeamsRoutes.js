// /api/teams

const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/TeamsController");

// rota para obter os dados de um clube através do seu id
router.get('/info/:id', teamsController.getTeamsInfo);

// rota para obter os jogadores de um clube através do seu id
router.get('/squad', teamsController.getSquadPlayers);

// rota que retorna as ligas em que uma equipa está inserida
router.get('/teamLeagues/:teamID', teamsController.getTeamLeagues);

// rota que retorna as estatisticas de uma equipa 
router.get('/teamStatistics/:teamID', teamsController.getTeamStatistics);

// rota que retorna os resultados de uma equipa numa determinada liga
router.get('/teamResults/:teamID', teamsController.getSquadResults);

// rota que retorna os últimos 5 resultados de uma equipa numa determinada liga
router.get('/lastTeamResults/:teamID', teamsController.getTeamLastFiveResults);

module.exports = router;