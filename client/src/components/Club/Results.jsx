import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Container, Image } from 'react-bootstrap';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchTeamResults } from "../../services/TeamsService"
import GameCard from '../Game/GameCard';

const Results = ({leagueID, season}) => {
  const { teamID } = useParams()
  const { data: results, loading, error, fetchData } = useApiRequest(fetchTeamResults);

  useEffect(() => {
    if (teamID && leagueID && season) {
        fetchData(teamID, leagueID, season);    
    }
  }, [teamID, leagueID, season, fetchData])

  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error.message}</p>;
  if (!results) return <p>Nenhum dado disponível.</p>;

  return (
    <Container className='mt-4'>
      {results.map((game, gameIndex) => (
        <GameCard GameData={game} key={gameIndex}/>
      ))}
    </Container>
  )
}
export default Results