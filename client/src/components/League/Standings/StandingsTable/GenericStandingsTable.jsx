import { Table, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";
import FallbackImage from '../../../CommonUI/FallbackImage';

const GenericStandingsTable = ({ group, descriptionColorMap, columns, renderExtraColumns }) => {
  return (
    <Table striped hover variant="dark" className='text-center'>
      <thead>
        <tr>
          <th>º</th>
          <th className='text-start'>Equipa</th>
          <th>PJ</th>
          <th>P</th>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {group.teams.map((team, teamIndex) => (
          <tr className="p-2" key={teamIndex}>
            <td>
              {team.teamStandingDescription ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-${teamIndex}`}>{team.teamStandingDescription}</Tooltip>}
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
            <td>{team.points}</td>
            {renderExtraColumns(team)}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
export default GenericStandingsTable