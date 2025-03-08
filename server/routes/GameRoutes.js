// /api/game

const express = require('express');
const router = express.Router();
const gameController = require("../controllers/GameController");

// Rota para obter os jogos disputados através de uma determinada data 
router.get('/gamesList', gameController.getGamesPerDay);

module.exports = router;