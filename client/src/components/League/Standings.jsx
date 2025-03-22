import React, { useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import { fetchLeagueStanding } from '../../services/CompetitionService';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';

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
    return form.split('').map(letter => formatBadgeGame(letter));
}

const StandingsTable = ({ teams, hasStandings }) => {
    // apenas irá mostrar o titulo do frupo, caso haja mais do que 1 grupo
    const isBiggerThanOneGroup = teams.length > 1;
    
    return (
        <>
            {hasStandings && teams.map((group, groupIndex) => (
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
                                    <td style={{ minWidth: '120px' }}>{formatTeamForm(team.form)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))} 
        </>
    );
};

const LeagueStandings = ({ teams, hasStandings }) => {
    return (
        <StandingsTable teams={ teams } hasStandings={ hasStandings }/>
    );
}

const CupStandings = ({ teams, hasStandings }) => {
    return (
        <>
            <div>
                Cup
            </div>
            <StandingsTable teams={ teams } hasStandings={ hasStandings }/>
        </>
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
    // do valor de 'teams' para não renderizar o componente <NotFound />
    if (!hasStandings) {
        return (
            type === 'League' ? <LeagueStandings teams={[]} hasStandings={hasStandings} /> : 
            type === 'Cup' ? <CupStandings teams={[]} hasStandings={hasStandings} /> : 
            <div>
                Erro inesperado nas classificações da competição.
            </div>
        );
    }


    // TODO: LÓGICA PARA A CUPSTANDINGS -> verificar hasStandings e o tamanho de teams -> fazer o mesmo para LEAGUESTANDINGS 
    // RETIFICAR A SITUAÇÃO DOS BOTÕES CASO SE TRATE DE UMA TAÇA SEM STANDINGS



    // esta parte só será executada se a liga tiver classificações disponíveis
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
        type === 'League' ? <LeagueStandings teams={groupedStandings} hasStandings={hasStandings} /> : 
        type === 'Cup' ? <CupStandings teams={groupedStandings} hasStandings={hasStandings} /> : 
        <div>
            Erro inesperado nas classificações da competição.
        </div>
    );
};

export default Standings;
