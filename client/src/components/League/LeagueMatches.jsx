import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Container, Image } from 'react-bootstrap';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchLeagueResults, fetchLeagueList } from '../../services/CompetitionService';
import GameCard from '../Game/GameCard';
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
    <Container className='mt-4'>
      <div>
        {type === 'pastGames' ? (
          <h5>Ultimos {games.length} jogos da liga:</h5>
        ) : type === 'upcomingGames' ? (
          <h5>Próximos {games.length} jogos da liga:</h5>
        ) : null }
      </div>
      {games.map((game, gameIndex) => (
        <GameCard GameData={game} key={gameIndex}/>
      ))}
    </Container>
  )
}
export default LeagueMatches