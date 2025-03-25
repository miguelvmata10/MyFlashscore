import { Table, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import FallbackImage from '../../CommonUI/FallbackImage';
import NotFound from '../../CommonUI/NotFound';
import { formatTeamForm } from '../../../utils/helpers';
import StandingsDescriptions from './StandingsDescriptions';
import useStandingsDescriptions from '../../../hooks/useStandingsDescriptions';

const StandingsTable = ({ groups, hasStandings, type }) => {
    console.log('groups: ', groups);
    const { descriptionsByLeague, descriptionColorMap } = useStandingsDescriptions(groups);

    // apenas irá mostrar o titulo do grupo, caso haja mais do que 1 grupo na liga
    const isBiggerThanOneGroup = groups.length > 1;

    // se hasStandings === false e se tratar de uma taça, então não quero que sejam mostrado <NotFound />
    // pois serão mostradas as rondas da Taça  
    if (!hasStandings && type === 'Cup') {
        return null;
    }

    // necessário fazer esta verificação, pois se groups é vazio então a verificação não é feita dentro de <Standings />
    if (!hasStandings && (!groups || groups.length === 0 )) {
        return <NotFound />;
    }
    
    return (
        <>
            <div>
                {(groups.map((group, groupIndex) => (
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
                                        <td>
                                            {team.teamStandingDescription ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="button-tooltip-2">{team.teamStandingDescription}</Tooltip>}
                                            >
                                                <Badge 
                                                    bg='custom'
                                                    style={{backgroundColor: descriptionColorMap[team.teamStandingDescription]}}
                                                >
                                                    <span>
                                                        {team.rank}
                                                    </span>
                                                </Badge>
                                            </OverlayTrigger>
                                            ) : (
                                                <span>
                                                    {team.rank}
                                                </span>
                                            )}
                                        </td>
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
            </div>
            <div>
                <StandingsDescriptions descriptionsByLeague={descriptionsByLeague} descriptionColorMap={descriptionColorMap}/>
            </div>
        </>
    );
};

export default StandingsTable