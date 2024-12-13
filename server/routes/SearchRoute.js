// /api/search

const express = require('express');
const router = express.Router();
const searchController = require("../controllers/SearchController");

// Rota para obter os jogadores com o nome dado pelo user 
router.get('/:type/:inputValue', searchController.searchEntity);

module.exports = router;