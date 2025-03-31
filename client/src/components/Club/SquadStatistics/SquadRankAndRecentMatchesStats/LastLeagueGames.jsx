import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GameCard from '../../../Game/GameCard/GameCard';
import NotFound from '../../../CommonUI/NotFound';

const LastLeagueGames = ({ results }) => {
    const { teamID } = useParams()
    const matchFinishedCodes = ['FT', 'AET', 'PEN'];

    const finishedGames = results.filter(game => 
      matchFinishedCodes.includes(game?.fixture?.status?.short)
    );

    const sortGames = [...finishedGames].sort(( a, b ) => 
      new Date(b?.fixture?.date) - new Date(a?.fixture?.date)
    );

    // filtra os últimos 5 jogos
    const lastFiveTeamGames = sortGames.slice(0, 5);

    const isTeamWinner = (game) => {
        const teams = game?.teams;
        const homeTeamGoals = game?.score?.fulltime?.home;
        const awayTeamGoals = game?.score?.fulltime?.away;
        const isFinished = matchFinishedCodes.includes(game?.fixture?.status?.short);

        // Se os dados do jogo forem inválidos
        if (!teams || !teams.away || !teams.home) return 'bg-transparent';

        // se o jogo não acabou
        if (!isFinished) return 'bg-transparent';

        // se o jogo já acabou
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
  
    if (lastFiveTeamGames.length === 0 ) return <NotFound />

    return (
      <Container className='mt-1'>
        {lastFiveTeamGames.map((game, gameIndex) => (
          <GameCard GameData={game} key={gameIndex} bgColor={isTeamWinner(game)} cardType='compact'/>
        ))}
      </Container>
    )
}
export default LastLeagueGames