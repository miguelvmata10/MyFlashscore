// /api/game

const express = require('express');
const router = express.Router();
const gameController = require("../controllers/GameController");

// Rota para obter os jogos existentes através de uma determinada data 
router.get('/gamesList', gameController.getGamesPerDay);

// Rota para obter um jogo pelo seu id 
router.get('/:id', gameController.getGameDetails);

module.exports = router;