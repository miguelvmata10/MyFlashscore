import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useApiRequest from '../../../hooks/useApiRequest';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import { fetchTeamLastResults } from '../../../services/TeamsService';
import GameCard from '../../Game/GameCard/GameCard';
import NotFound from '../../CommonUI/NotFound';

const LastLeagueGames = ({ leagueID, season }) => {
    const { teamID } = useParams()
    const { data: results, loading, error, fetchData } = useApiRequest(fetchTeamLastResults);
  
    useEffect(() => {
      if (teamID && leagueID && season) {
          fetchData(teamID, leagueID, season);    
      }
    }, [teamID, leagueID, season, fetchData])
  
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!results || results.length === 0) return <NotFound />;

    const isTeamWinner = (game) => {
        const teams = game.teams;
        const homeTeamGoals = game.score.fulltime.home;
        const awayTeamGoals = game.score.fulltime.away;

        if (teams.away.id == teamID) {
            return teams.away.winner ? 'bg-success' : (awayTeamGoals < homeTeamGoals) ? 'bg-danger' : 'bg-warning';
        } 
        else if (teams.home.id == teamID) {
            return teams.home.winner ? 'bg-success' : (homeTeamGoals < awayTeamGoals) ? 'bg-danger' : 'bg-warning';
        } 
        // erro -> deixa sem cor
        else {
            return 'bg-transparent';
        }
    } 
  
    return (
      <Container className='mt-1'>
        {results.map((game, gameIndex) => (
          <GameCard GameData={game} key={gameIndex} bgColor={isTeamWinner(game)} cardType='compact'/>
        ))}
      </Container>
    )
}
export default LastLeagueGames