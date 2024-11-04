const express = require("express");
const app = express();
const cors = require("cors"); // Import CORS module to manage cross-origin requests
const corsOption = {
    origin: ["http://localhost:5173"] // Specifies allowed origins, only "http://localhost:5173" can access the API
};

app.use(cors(corsOption)) // Apply CORS settings to enable controlled access to the API

app.get("/api", (req, res) => {
    res.json({teste: ["test1", "test2"]})
});

app.listen(8080, () => {
    console.log("Listening in port 8080!")
});