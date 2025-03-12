import { ListGroup, Accordion , Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GameCard from '../Game/GameCard';
import './Matchlist.css';
import default_leagueOrCountry_logo from '../../assets/FallbackImages/default_leagueOrCountry_logo.png';

const MatchList = ({leagueGames, type}) => {
    // apenas as top leagues estarão abertas por default
    // as ligas com menos importância estarão 'fechadas' para poupar o nº de imagens da API
    const accordionAlwaysOpen = type === 'topLeagues' ? true : false;
    const defaultActiveKeys = type === 'topLeagues' ? Array.from({ length: leagueGames.length }, (_, index) => String(index))
    : [];

    console.log('keys:', defaultActiveKeys)
    console.log('LIGA DATA: ', leagueGames);
    return (
        <Accordion defaultActiveKey={defaultActiveKeys} alwaysOpen={accordionAlwaysOpen}>
            {leagueGames.map((league, index) => (
                <Accordion.Item eventKey={String(index)} key={index} className='bg-transparent mb-2'>
                    <Accordion.Header>
                        <Image src={league.flag} className="imageResize me-1" onError={(e) => (e.currentTarget.src = default_leagueOrCountry_logo)} />
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