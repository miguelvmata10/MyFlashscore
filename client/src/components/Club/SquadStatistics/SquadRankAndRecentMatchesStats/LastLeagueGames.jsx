import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GameCard from '../../../Game/GameCard/GameCard';
import NotFound from '../../../CommonUI/NotFound';
import { isTeamWinner } from '../../../../utils/helpers';
import { matchFinishedCodes } from '../../../../utils/helpers';

const LastLeagueGames = ({ results }) => {
    const { teamID } = useParams();

    const finishedGames = results.filter(game => 
      matchFinishedCodes.includes(game?.fixture?.status?.short)
    );

    const sortGames = [...finishedGames].sort(( a, b ) => 
      new Date(b?.fixture?.date) - new Date(a?.fixture?.date)
    );

    // filtra os últimos 5 jogos
    const lastFiveTeamGames = sortGames.slice(0, 5);
  
    if (lastFiveTeamGames.length === 0 ) return <NotFound />

    return (
      <Container className='mt-1'>
        {lastFiveTeamGames.map((game, gameIndex) => (
          <GameCard GameData={game} key={gameIndex} bgColor={isTeamWinner({ game: game, teamID: teamID })} cardType='compact'/>
        ))}
      </Container>
    )
}
export default LastLeagueGames