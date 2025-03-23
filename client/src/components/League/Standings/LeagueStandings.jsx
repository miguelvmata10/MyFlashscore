import StandingsTable from './StandingsTable';

const LeagueStandings = ({ teams, hasStandings, type }) => {
    return (
        <StandingsTable teams={teams} hasStandings={hasStandings} type={type} />
    );
}

export default LeagueStandings;