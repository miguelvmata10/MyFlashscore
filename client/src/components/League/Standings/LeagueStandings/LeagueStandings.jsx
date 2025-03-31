import StandingsTable from '../StandingsTable/StandingsTable';

const LeagueStandings = ({ teams, hasStandings, type, teamID = null }) => {
    return (
        <StandingsTable groups={teams} hasStandings={hasStandings} type={type} teamID={teamID} />
    );
}

export default LeagueStandings;