const express = require("express");
const app = express();
const cors = require("cors"); // Import CORS module to manage cross-origin requests
const corsOption = {
    origin: ["http://localhost:5173"] // Specifies allowed origins, only "http://localhost:5173" can access the API
};
const competitionRoutes = require("./routes/CompetitionRoutes");
const gameRoutes = require("./routes/GameRoutes");
const peopleRoutes = require("./routes/PeopleRoute");
const teamsRoutes = require("./routes/TeamsRoutes");
const searchRoutes = require("./routes/SearchRoute");

app.use(cors(corsOption)) // Apply CORS settings to enable controlled access to the API

// middlewares para as routes
app.use('/api/competitions', competitionRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/search', searchRoutes);

app.listen(8080, () => {
    console.log("Listening in port 8080!")
});