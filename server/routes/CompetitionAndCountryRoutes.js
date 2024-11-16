// /api/competitions

const express = require('express');
const router = express.Router();
const competitionAndCountryController = require("../controllers/CompetitionsAndCountryController");

// rota para obter a lista de países
router.get('/countries', competitionAndCountryController.getCountries);

module.exports = router;
