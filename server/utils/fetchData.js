const apiFootballReq = require('../services/apiFootball');

const fetchData = async (endpoint, params = {}, res) => {
    try {
        const data = await apiFootballReq(endpoint, params);  
        
        if (!data.response || data.response.length === 0) {
            return res.status(404).json({ error: `No data find for endpoint: ${endpoint}` });
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error in endpoint "${endpoint}":`, error.message);
        res.status(500).json({ error: `Error in endpoint "${endpoint}"` });
    }
};

module.exports = fetchData;