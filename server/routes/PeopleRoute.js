// /api/people

const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/PeopleController');

// rota para obter os dados de um jogador de acordo com o seu id
router.get('/playerData/:id', peopleController.getPlayerProfileByID);

// rota para obter os dados de um treinador de acordo com o seu id
router.get('/coachData/:id', peopleController.getCoachProfileByID);

module.exports = router;
