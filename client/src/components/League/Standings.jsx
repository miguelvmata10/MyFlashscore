import React, { useEffect, useState } from 'react';
import { Table, Image } from 'react-bootstrap';
import api from '../../services/api';

const Standings = ({ leagueID, season }) => {

  const [teams, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeagueStanding = async () => {
    console.log(leagueID);
    try {
      const response = await api.get('/competitions/standings', {
        params: {
          league: leagueID,
          season: season,
        },
      });
      console.log('Dados recebidos:', response.data);
      setStandings(response.data.response[0].league.standings[0]); 
    } catch (error) {
      console.error('Erro ao obter os dados da liga:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLeagueStanding();
  }, [leagueID, season]);

  if (loading) {
    <div>Carregando...</div>
  }
  return (
    <Table striped hover responsive variant="dark" className='p-3'>
      <thead>
        <tr>
          <th>º</th>
          <th>Equipa</th>
          <th>PJ</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>G</th>
          <th>DG</th>
          <th>P</th>
          <th>Forma</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr className='p-2' key={team.rank}>
            <td>{team.rank}</td>
            <td>
              <Image className='imageResize ' src={team.team.logo} width={30} height={30}/>
              <span className='ms-3'>{team.team.name}</span>
            </td>
            <td>{team.all.played}</td>
            <td>{team.all.win}</td>
            <td>{team.all.draw}</td>
            <td>{team.all.lose}</td>
            <td>{`${team.all.goals.for}:${team.all.goals.against}`}</td>
            <td>{team.all.goals.for - team.all.goals.against}</td>
            <td>{team.points}</td>
            <td>{team.form}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Standings;
