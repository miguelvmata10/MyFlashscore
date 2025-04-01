import { Button } from 'react-bootstrap';
import GenericStandingsTable from './GenericStandingsTable';

const homeTeamResult = ({teamID, otherTeamID, results}) => {
  if (!teamID || !otherTeamID || !results) return "-";

  // significa que é ele mesmo
  if (teamID == otherTeamID) return '';

  const homeGame = results.filter(game => 
    game.teams.home.id == teamID && 
    game.teams.away.id == otherTeamID &&
    game.fixture.status.short === "FT"  
  );

  if (homeGame.length === 0) return "-";

  return `${homeGame[0].goals.home}-${homeGame[0].goals.away}`;
}

const awayTeamResult = ({teamID, otherTeamID, results}) => {
  if (!teamID || !otherTeamID || !results) return "-";

  // significa que é ele mesmo
  if (teamID == otherTeamID) return '';

  const awayGame = results.filter(game => 
    game.teams.home.id == otherTeamID && 
    game.teams.away.id == teamID &&
    game.fixture.status.short === "FT"  
  );

  if (awayGame.length === 0) return "-";

  return `${awayGame[0].goals.home}-${awayGame[0].goals.away}`;
}

const h2h = ({teamID, otherTeamID}) => {
  // significa que é ele mesmo
  if (teamID == otherTeamID) return '';

  return (
    <Button>H2H</Button>
  )
}

const TeamStandingsTable = ({ group, descriptionColorMap, teamID, results }) => {

  const columns = [
    { header: 'Home', key: 'home' },
    { header: 'Away', key: 'away' },
    { header: 'H2H', key: 'h2h' }
  ];

  const renderExtraColumns = (team) => (
    <>
      <td>{homeTeamResult({teamID: teamID, otherTeamID: team.teamID, results: results})}</td> 
      <td>{awayTeamResult({teamID: teamID, otherTeamID: team.teamID, results: results})}</td> 
      <td>{h2h({teamID: teamID, otherTeamID: team.teamID})}</td> 
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