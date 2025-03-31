import { useParams } from 'react-router-dom';
import useLeagueData from "../../../../hooks/useLeagueData";
import LoadingScreen from "../../../CommonUI/LoadingScreen";
import NotFound from "../../../CommonUI/NotFound";
import Standings from "../../../League/Standings/Standings";

const SquadStandingsStatistics = ({ leagueID, results }) => {
    const { teamID } = useParams();
    const { leagueData, leagueDataLoading, leagueDataError } = useLeagueData(leagueID);
    
    if (leagueDataLoading) return <LoadingScreen />;
    if (leagueDataError) return <p>Erro: {error.message}</p>;
    if (!leagueData || leagueData.length === 0) return <NotFound />;

    const currentSeason = leagueData[0]?.seasons.find(season => season.current);
    const hasStandings = currentSeason?.coverage?.standings;
    const leagueType = leagueData[0]?.league?.type;

    if (!hasStandings) return <NotFound />;

    return (
        <Standings season={currentSeason.year} type={leagueType} hasStandings={hasStandings} leagueID={leagueID} teamID={teamID} />
    )
}

export default SquadStandingsStatistics