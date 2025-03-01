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

module.exports = router;
