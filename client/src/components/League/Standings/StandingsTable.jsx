import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import FallbackImage from '../../CommonUI/FallbackImage';
import NotFound from '../../CommonUI/NotFound';
import { formatTeamForm } from '../../../utils/helpers';

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

export default StandingsTable