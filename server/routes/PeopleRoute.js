// /api/people

const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/PeopleController');

// rota para obter os dados de um jogador de acordo com o seu id
router.get('/playerData/:id', peopleController.getPlayerProfileByID);

module.exports = router;
