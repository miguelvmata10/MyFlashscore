import React, { useEffect, useState } from 'react';
import { Table, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
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
    <Table striped hover responsive variant="dark">
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
        {teams.map((team) => {
          const teamData = team?.all; 
          const teamName = team?.team?.name || 'N/A';
          const teamID = team?.team?.id || 'N/A';
          const teamLogo = team?.team?.logo || ''; 
          const rank = team?.rank || 'N/A';
          const gamesPlayed = teamData?.played ?? 'N/A';
          const gamesWon = teamData?.win ?? 'N/A';
          const gamesDrawn = teamData?.draw ?? 'N/A';
          const gamesLost = teamData?.lose ?? 'N/A';
          const goalsFor = teamData?.goals?.for ?? 0;
          const goalsAgainst = teamData?.goals?.against ?? 0;
          const goalDifference = goalsFor - goalsAgainst;
          const points = team?.points ?? 'N/A';
          const form = team?.form || 'N/A';

          return (
            <tr className="p-2" key={rank}>
              <td>{rank}</td>
              <td>
                <Image className="imageResize" src={teamLogo} alt="Team logo" />
                <span className="ms-3">
                  <Link to={`/team/${teamID}`} className="customLink">
                    {teamName}
                  </Link>
                </span>
              </td>
              <td>{gamesPlayed}</td>
              <td>{gamesWon}</td>
              <td>{gamesDrawn}</td>
              <td>{gamesLost}</td>
              <td>{`${goalsFor}:${goalsAgainst}`}</td>
              <td>{goalDifference}</td>
              <td>{points}</td>
              <td>{form}</td>
            </tr>
          );
        })}
      </tbody>

    </Table>
  );
};

export default Standings;
