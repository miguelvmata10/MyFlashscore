const fetchData = require('../utils/fetchData');

const getPlayerProfileByID = (req, res) => {
    const playerID = req.params.id;
    fetchData('players/profiles', { player: playerID }, res);
};

const getCoachProfileByID = (req, res) => {
    const coachID = req.params.id;
    fetchData('coachs', { id: coachID }, res);
};

const getCoachTrophies = (req, res) => {
    const coachID = req.params.id;
    fetchData('trophies', { coach: coachID }, res);
};

const getPlayerTransfers = (req, res) => {
    const playerID = req.params.id;
    fetchData('transfers', { player: playerID }, res);
};

const getPlayerTrophies = (req, res) => {
    const playerID = req.params.id;
    fetchData('trophies', { player: playerID }, res);
};

const getPlayerSeasonsAvailable = (req, res) => {
    const playerID = req.params.id;
    fetchData('players/seasons', { player: playerID }, res);
};

const getPlayerStatistics = (req, res) => {
    const playerID = req.params.id;
    const { season } = req.query;
    fetchData('players', { id: playerID, season: season }, res);
};

module.exports = {
    getPlayerProfileByID,
    getCoachProfileByID,
    getCoachTrophies,
    getPlayerTransfers,
    getPlayerTrophies,
    getPlayerSeasonsAvailable,
    getPlayerStatistics,
}
