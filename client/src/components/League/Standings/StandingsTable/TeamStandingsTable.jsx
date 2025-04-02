import { Badge } from 'react-bootstrap';
import GenericStandingsTable from './GenericStandingsTable';
import HeadToHeadButton from '../../../Club/SquadStatistics/SquadRankAndRecentMatchesStats/HeadToHeadStatistics/HeadToHeadButton';

const formatBadgeGameResult = ({isHome, homeGoals, awayGoals}) => {
  if (homeGoals === undefined || awayGoals === undefined) {
    return <Badge className='p-2' bg='secondary'> - </Badge>;
  }

  const didWin = isHome ? homeGoals > awayGoals : homeGoals < awayGoals;
  const didLose = isHome ? homeGoals < awayGoals : homeGoals > awayGoals;
  const didTie = homeGoals == awayGoals;

  let bgColor = 'secondary'; // default
  if (didWin) {
    bgColor = 'success';
  } else if (didTie) {
    bgColor = 'warning';
  } else if (didLose) {
    bgColor = 'danger';
  }

  return <Badge className='p-2' bg={bgColor}>{homeGoals} - {awayGoals}</Badge>;
};

const getTeamResults = ({teamID, otherTeamID, results, isHome}) => {
  if (!teamID || !otherTeamID || !results) return "-";

  if ( teamID == otherTeamID) return '';

  const game = results.find(game =>
    game.teams.home.id == (isHome ? teamID : otherTeamID ) && 
    game.teams.away.id == (isHome ? otherTeamID : teamID ) &&
    game.fixture.status.short === "FT"
  );

  if (!game) return '-';

  return formatBadgeGameResult({isHome: isHome, homeGoals: game.goals.home, awayGoals: game.goals.away});
}

const TeamStandingsTable = ({ group, descriptionColorMap, teamID, results }) => {

  const columns = [
    { header: 'Home', key: 'home' },
    { header: 'Away', key: 'away' },
    { header: 'H2H', key: 'h2h' }
  ];

  const renderExtraColumns = (team) => (
    <>
      <td>{getTeamResults({teamID: teamID, otherTeamID: team.teamID, results: results, isHome: true})}</td> 
      <td>{getTeamResults({teamID: teamID, otherTeamID: team.teamID, results: results})}</td> 
      <td><HeadToHeadButton teamID={teamID} otherTeamID={team.teamID} /></td> 
    </>
  );

  return (
    <GenericStandingsTable 
      group={group} 
      descriptionColorMap={descriptionColorMap} 
      columns={columns} 
      renderExtraColumns={renderExtraColumns}
    />
  )
}
export default TeamStandingsTable