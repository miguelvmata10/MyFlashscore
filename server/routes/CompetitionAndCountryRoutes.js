// /api/competitions

const express = require('express');
const router = express.Router();
const competitionAndCountryController = require("../controllers/CompetitionsAndCountryController");

// rota para obter a lista de países
router.get('/countries', competitionAndCountryController.getCountries);

// rota para obter todas as ligas
router.get('/leagues', competitionAndCountryController.getLeagues);

// rota para obter as ligas de um determinado país 
router.get('/countries/leagues', competitionAndCountryController.getLeaguesPerCountry);

// rota para obter a liga com o id 'id'
router.get('/leagues/:id', competitionAndCountryController.getLeaguePerID);

module.exports = router;
