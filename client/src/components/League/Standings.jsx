import React, { useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchLeagueStanding } from '../../services/CompetitionService';

const Standings = ({ leagueID, season }) => {
    const { data: teams, loading, error, fetchData } = useApiRequest(fetchLeagueStanding);

    useEffect(() => {
        if (leagueID && season) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!teams) return <p>Nenhum dado disponível.</p>;
    
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
            {teams[0].league.standings[0].map((team) => {
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
