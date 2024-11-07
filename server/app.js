const express = require("express");
const app = express();
const apiFootballReq = require('./services/apiFootball');
const cors = require("cors"); // Import CORS module to manage cross-origin requests
const corsOption = {
    origin: ["http://localhost:5173"] // Specifies allowed origins, only "http://localhost:5173" can access the API
};

app.use(cors(corsOption)) // Apply CORS settings to enable controlled access to the API

// Rota para testar o request
app.get('/test-football-api', async (req, res) => {
    const endpoint = 'leagues';  
    const params = { id: '39', season: '2022' };  
  
    try {
      const data = await apiFootballReq(endpoint, params);  
      res.json(data);  
    } catch (error) {
      res.status(500).json({ message: 'Erro na requisição', error: error.message });
    }
  });

app.listen(8080, () => {
    console.log("Listening in port 8080!")
});