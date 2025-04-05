import { formatTeamForm } from '../../../../utils/helpers';
import GenericStandingsTable from './GenericStandingsTable';

const LeagueStandingsTable = ({ group, descriptionColorMap}) => {

  const columns = [
    { header: 'V', key: 'gamesWon' },
    { header: 'D', key: 'gamesDrawn' },
    { header: 'L', key: 'gamesLost' },
    { header: 'G', key: 'goals' },
    { header: 'GD', key: 'goalDifference' },
    { header: 'Form', key: 'form' }
  ];
  
  const renderExtraColumns = (team) => (
    <>
      <td>{team.gamesWon}</td>
      <td>{team.gamesDrawn}</td>
      <td>{team.gamesLost}</td>
      <td>{`${team.goalsFor}:${team.goalsAgainst}`}</td>
      <td>{team.goalDifference}</td>
      <td style={{ minWidth: '110px' }}>{formatTeamForm(team.form)}</td>
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
export default LeagueStandingsTable