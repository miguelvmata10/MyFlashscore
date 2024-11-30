// /api/teams

const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/TeamsController");

// rota para obter os dados de um clube através do seu id
router.get('/info/:id', teamsController.getTeamsInfo);

// rota para obter os dados de um clube através do seu id
router.get('/squad', teamsController.getSquadPlayers);

module.exports = router;