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

module.exports = router;