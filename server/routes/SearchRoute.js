// /api/search

const express = require('express');
const router = express.Router();
const searchController = require("../controllers/SearchController");

router.get('/players', searchController.getSearchPlayers);

module.exports = router;