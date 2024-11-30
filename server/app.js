const express = require("express");
const app = express();
const apiFootballReq = require('./services/apiFootball');
const cors = require("cors"); // Import CORS module to manage cross-origin requests
const corsOption = {
    origin: ["http://localhost:5173"] // Specifies allowed origins, only "http://localhost:5173" can access the API
};
const competitionAndCountryRoutes = require("./routes/CompetitionAndCountryRoutes");
const gameRoutes = require("./routes/GameRoutes");
const peopleRoutes = require("./routes/PeopleRoute");
const teamsRoutes = require("./routes/TeamsRoutes");

app.use(cors(corsOption)) // Apply CORS settings to enable controlled access to the API

// middlewares para as routes
app.use('/api/competitions', competitionAndCountryRoutes);
// app.use('/api/game', gameRoutes);
// app.use('/api/people', peopleRoutes);
app.use('/api/teams', teamsRoutes);

app.listen(8080, () => {
    console.log("Listening in port 8080!")
});