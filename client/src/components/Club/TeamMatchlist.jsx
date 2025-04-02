import { Container } from 'react-bootstrap';
import LoadingScreen from '../CommonUI/LoadingScreen';
import GameCard from '../Game/GameCard/GameCard';
import NotFound from '../CommonUI/NotFound';
import { useTeamResults } from '../../hooks/useTeamResults';

const TeamMatchlist = ({ leagueID, season }) => {
  const { results, resultsLoading, resultsError } = useTeamResults(leagueID, season);

  if (resultsLoading) return <LoadingScreen />;
  if (resultsError) return <p>Erro: {resultsError.message}</p>;
  if (!results || results.length === 0) return <NotFound />;

  return (
    <Container className='mt-4'>
      {results.map((game, gameIndex) => (
        <GameCard GameData={game} key={gameIndex}/>
      ))}
    </Container>
  )
}
export default TeamMatchlist