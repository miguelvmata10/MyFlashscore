// /api/people

const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/PeopleController');

// rota para obter os dados de um jogador de acordo com o seu id
router.get('/playerData/:id', peopleController.getPlayerProfileByID);

// rota para obter os dados de um treinador de acordo com o seu id
router.get('/coachData/:id', peopleController.getCoachProfileByID);

// rota para obter os dados de um treinador de acordo com o seu id
router.get('/coachTrophies/:id', peopleController.getCoachTrophies);

// rota para obter as transferências de um jogador ao longo da carreira de acordo com o seu id
router.get('/playerTransfers/:id', peopleController.getPlayerTranfers);

// rota para obter os dados de um jogador de acordo com o seu id
router.get('/playerTrophies/:id', peopleController.getPlayerTrophies);

// rota para obter as épocas disponiveis de um jogador de acordo com o seu id
router.get('/playerSeasons/:id', peopleController.getPlayerSeasonsAvailable);

// rota para obter os dados estatísticos de um jogador de acordo com o seu id
router.get('/playerStatistics/:id', peopleController.getPlayerStatistics);

module.exports = router;
