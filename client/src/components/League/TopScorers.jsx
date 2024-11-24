import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const TopScorers = ({leagueID, season}) => {

  const [topScorers, setTopScorers] = useState([]);
  const [topAssisters, setTopAssisters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função genérica para ir buscar os dados à API => TALVEZ COLOCAR NUM FICHEIRO À PARTE PARA USAR NOUTROS COMPS
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await api.get(endpoint, {
        params: {
          league: leagueID,
          season: season,
        },
      });
      setter(response.data.response); 
    } catch (error) {
      console.error(`Erro ao obter dados de ${endpoint}:`, error.response || error.message);
    } finally {
      setLoading(false); 
    }
  };
  
  const fetchTopScorers = () => fetchData('/competitions/league/topScorers', setTopScorers);
  const fetchTopAssisters = () => fetchData('/competitions/league/topAssisters', setTopAssisters);

  return (
    <div>TopScorers</div>
  )
}
export default TopScorers