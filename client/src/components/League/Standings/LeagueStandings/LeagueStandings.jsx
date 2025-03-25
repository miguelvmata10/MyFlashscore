import StandingsTable from '../StandingsTable';

const LeagueStandings = ({ teams, hasStandings, type }) => {
    return (
        <StandingsTable groups={teams} hasStandings={hasStandings} type={type} />
    );
}

export default LeagueStandings;