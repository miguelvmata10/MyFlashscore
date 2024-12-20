// /api/teams

const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/TeamsController");

// rota para obter os dados de um clube através do seu id
router.get('/info/:id', teamsController.getTeamsInfo);

// rota para obter os jogadores de um clube através do seu id
router.get('/squad', teamsController.getSquadPlayers);

// rota para obter o treinador de um clube através do seu id
router.get('/coach', teamsController.getSquadCoach);

// rota que retorna as ligas em que uma equipa está inserida
router.get('/teamLeagues/:teamID', teamsController.getTeamLeagues);

// rota que retorna as ligas em que uma equipa está inserida
router.get('/teamStatistics/:teamID', teamsController.getTeamStatistics);

module.exports = router;