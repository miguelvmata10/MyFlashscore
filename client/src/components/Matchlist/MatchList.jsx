import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GameCard from '../Game/GameCard';
import './Matchlist.css';
import FallbackImage from '../CommonUI/FallbackImage';

const MatchList = ({leagueGames, type}) => {
    // apenas as top leagues estarão abertas por default
    // as ligas com menos importância estarão 'fechadas' para poupar o nº de imagens da API
    const accordionAlwaysOpen = type === 'topLeagues' ? true : false;
    const defaultActiveKeys = type === 'topLeagues' ? Array.from({ length: leagueGames.length }, (_, index) => String(index)) : [];

    return (
        <Accordion defaultActiveKey={defaultActiveKeys} alwaysOpen={accordionAlwaysOpen}>
            {leagueGames.map((league, index) => (
                <Accordion.Item eventKey={String(index)} key={index} className='bg-transparent mb-2'>
                    <Accordion.Header>
                        <FallbackImage 
                            src={league.flag}
                            type='country'
                            className="imageResize me-1"
                        />
                        <Link to={`/league/${league.id}`} className="customLink ms-1">
                            {league.name}
                        </Link>
                    </Accordion.Header>
                    <Accordion.Body className='p-0'>
                        {league.games.map((game, gameIndex) => (
                            <GameCard GameData={game} key={gameIndex}/>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
export default MatchList