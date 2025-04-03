import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchLeagueResults, fetchLeagueList } from '../../services/CompetitionService';
import GameCard from '../Game/GameCard/GameCard';
import NotFound from '../CommonUI/NotFound';

const LeagueMatches = ({ type }) => {
  const { leagueID } = useParams()
  const apiFunction = type === 'pastGames' ? fetchLeagueResults : fetchLeagueList;
  const { data: games, loading, error, fetchData } = useApiRequest(apiFunction);
  

  useEffect(() => {
    if (leagueID) {
        fetchData(leagueID);    
    }
  }, [leagueID, fetchData, type])

  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error.message}</p>;
  if (!games || games.length === 0 ) return <NotFound />;

  return (
    <Container className='mt-2'>
      <div>
        {type === 'pastGames' ? (
          <h5 className='heading-border'>Last {games.length} games </h5>
        ) : type === 'upcomingGames' ? (
          <h5 className='heading-border'>Next {games.length} games </h5>
        ) : null }
      </div>
      {games.map((game, gameIndex) => (
        <GameCard GameData={game} key={gameIndex}/>
      ))}
    </Container>
  )
}
export default LeagueMatches