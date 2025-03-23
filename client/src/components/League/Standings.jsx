import React, { useEffect, useRef } from 'react';
import { Table, Badge, ButtonGroup, Row, Button, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchLeagueStanding, fetchLeagueRounds } from '../../services/CompetitionService';
import { fetchRoundGames } from '../../services/GameService';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import useButtonGroup from '../../hooks/useButtonGroup';
import GameCard from '../Game/GameCard';

const formatBadgeGame = (letter) => {
    switch (letter) {
        case 'W':
            return <Badge bg="success">{letter}</Badge>
        case 'L':
            return <Badge bg="danger">{letter}</Badge>
        case 'D':
            return <Badge bg="warning">{letter}</Badge>
        default:
            return <Badge bg="dark">{letter}</Badge>
    }
}

const formatTeamForm = (form) => {
    if (!form || form === 'N/A') {
        return "-";
    }
    return form.split('').map((letter, index) => (
        <span key={index}>
            {formatBadgeGame(letter)}
        </span>
    ));
}

const StandingsTable = ({ teams, hasStandings, type }) => {
    // apenas irá mostrar o titulo do grupo, caso haja mais do que 1 grupo na liga
    const isBiggerThanOneGroup = teams.length > 1;

    // se hasStandings === false e se tratar de uma taça, então não quero que sejam mostrado <NotFound />
    // pois serão mostradas as rondas da Taça  
    if (!hasStandings && type === 'Cup') {
        return null;
    }

    // necessário fazer esta verificação, pois se teams é vazio então a verificação não é feita dentro de <Standings />
    if (!hasStandings && (!teams || teams.length === 0 )) {
        return <NotFound />;
    }
    
    return (
        <>
            {(teams.map((group, groupIndex) => (
                <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} key={groupIndex}>
                    {isBiggerThanOneGroup && <h6 className='border-start border-danger border-4 ps-2 py-1 bg-transparent bg-opacity-50 rounded-start'>
                        {group.groupName}
                    </h6>}
                    <Table striped hover variant="dark" className='text-center'>
                        <thead>
                            <tr>
                                <th>º</th>
                                <th className='text-start'>Equipa</th>
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
                            {group.teams.map((team, teamIndex) => (
                                <tr className="p-2" key={teamIndex}>
                                    <td>{team.rank}</td>
                                    <td className='text-start'>
                                        <FallbackImage className="imageResize" type='team' src={team.teamLogo} alt="Team logo" />
                                        <span className="ms-3">
                                            <Link to={`/team/${team.teamID}`} className="customLink">
                                                {team.teamName}
                                            </Link>
                                        </span>
                                    </td>
                                    <td>{team.gamesPlayed}</td>
                                    <td>{team.gamesWon}</td>
                                    <td>{team.gamesDrawn}</td>
                                    <td>{team.gamesLost}</td>
                                    <td>{`${team.goalsFor}:${team.goalsAgainst}`}</td>
                                    <td>{team.goalDifference}</td>
                                    <td>{team.points}</td>
                                    <td style={{ minWidth: '110px' }}>{formatTeamForm(team.form)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )))} 
        </>
    );
};

const LeagueStandings = ({ teams, hasStandings, type }) => {
    return (
        <StandingsTable teams={ teams } hasStandings={ hasStandings } type={ type } />
    );
}

const CupStandings = ({ teams, hasStandings, type, season}) => {
    const { leagueID } = useParams();
    const { data: leagueRounds, loading, error, fetchData } = useApiRequest(fetchLeagueRounds);

    useEffect(() => {
        if (leagueID && season) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;

    console.log('TACAAA: ', leagueRounds);

    return (
        <DisplayCupStandings
            teams={ teams }
            hasStandings={ hasStandings }
            type={ type }
            leagueRounds={ leagueRounds }
            season={ season }
        />
    );
}

const DisplayCupStandings = ({ teams, hasStandings, type, leagueRounds, season }) => {

    // tem standings e rondas
    if (hasStandings && leagueRounds && leagueRounds.length > 0) {
        // aqui faz a lógica dos dois botões superiores
        return <StandingsTable teams={ teams } hasStandings={ hasStandings } type={ type } />;
    }
    
    // apenas tem standings -> dificilmente acontecerá 
    if (hasStandings && (!leagueRounds || leagueRounds.length === 0)) {
        return <p>Sem rondas disponíveis</p>; // ou outra lógica apropriada
    }

    // não tem standings, mas tem rondas
    if (!hasStandings && leagueRounds && leagueRounds.length > 0) {
        return <CupRoundGamesSelector leagueRounds={leagueRounds} season={season} />
    }

    // não tem nada
    return <NotFound />;
};

const CupRoundGamesSelector = ( { leagueRounds, season }) => {
    // guarda o indice da ultima ronda -> ou seja, a atual que será a ronda default
    const currentRoundLength = leagueRounds.length - 1;
    const { selected, handleButtonState, isActiveButton } = useButtonGroup(leagueRounds[currentRoundLength]);
    const scrollContainerRef = useRef(null);
    
    useEffect(() => {
        // Scroll para a direita quando o componente se iniciar, porque a 
        // default round é sempre a última
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    const renderComponent = () => {
        const foundRound = leagueRounds.find(round => round === selected);
        return foundRound ? <DisplayCupRoundGames season={season} round={foundRound} /> : <div>Erro</div>;
    };
 
    return (
        <Container>
            <Row>
                <div className="overflow-auto mb-3" ref={scrollContainerRef}>
                    <ButtonGroup className='mb-4 w-50' size="sm">
                        {leagueRounds.map(( round, index) => (
                            <Button
                                className={`${isActiveButton(round)} text-nowrap`}
                                onClick={() => handleButtonState(round)}
                                key={ index }
                            >
                                { round }
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </Row>
            <Row>
                {renderComponent()}
            </Row>
        </Container>
    );
}

const DisplayCupRoundGames = ( { round, season }) => {
    const { leagueID } = useParams();
    const { data: roundGames, loading, error, fetchData } = useApiRequest(fetchRoundGames);

    useEffect(() => {
        if (leagueID && season && round) {
            fetchData(leagueID, season, round);  
        }
    }, [leagueID, season, round, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!roundGames || roundGames.length === 0 ) return <NotFound />;

    return (
        <Row>
            {roundGames.map((game, index) => (
                <GameCard GameData={game} key={index}/>
            ))}
        </Row>
    );
}

const Standings = ({ season, type, hasStandings }) => {
    const { leagueID } = useParams();
    const { data: teams, loading, error, fetchData } = useApiRequest(fetchLeagueStanding);

    useEffect(() => {
        if (leagueID && season && hasStandings) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData, hasStandings]);

    // necessário fazer esta lógica aqui pois pode não haver standings para uma competição, mas ainda ser válido
    // por exemplo, taças não têm standings, mas têm rondas, por isso é necessário colocar esta lógica antes da verificação 
    // do valor de 'teams' para não renderizar o componente <NotFound /> e se necessário apenas dentro do componente <LeagueStandings />
    // nos casos onde o array não tem dados para standings, apesar de hasStandings ser verdadeiro 
    if (!hasStandings) {
        return (
            type === 'League' ? <LeagueStandings teams={[]} hasStandings={hasStandings} type={ type }/> : 
            type === 'Cup' ? <CupStandings teams={[]} hasStandings={hasStandings} type={ type } season={ season }/> : 
            <div>
                Erro inesperado nas classificações da competição.
            </div>
        );
    }

    // esta parte só será executada se a competição tiver classificações disponíveis
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!teams || teams.length === 0 ) return <NotFound />;

    // garantir que há standings
    const standings = teams[0]?.league?.standings || [];

    const groupedStandings = standings.map(( group ) => {
        // como a API não fornece o nome de cada grupo, fui buscar o nome de cada grupo dentro 
        // da primeira equipa de cada grupo
        const groupName = group[0]?.group || 'N/A';

        const teams = group.map((team) => {
            const teamData = team?.all;
            const teamName = team?.team?.name || 'N/A';
            const groupName = team?.group;
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

            return {
                teamName,
                groupName,
                teamID,
                teamLogo,
                rank,
                gamesPlayed,
                gamesWon,
                gamesDrawn,
                gamesLost,
                goalsFor,
                goalsAgainst,
                goalDifference,
                points,
                form
            }
        })

        return {
            groupName,
            teams
        }
    });

    return (
        type === 'League' ? <LeagueStandings teams={groupedStandings} hasStandings={hasStandings} type={ type } /> : 
        type === 'Cup' ? <CupStandings teams={groupedStandings} hasStandings={hasStandings} type={ type } season={ season } /> : 
        <div>
            Erro inesperado nas classificações da competição.
        </div>
    );
};

export default Standings;
