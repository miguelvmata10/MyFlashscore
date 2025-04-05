import { useParams } from 'react-router-dom';
import useLeagueData from '../../../../hooks/api/useLeagueData';
import LoadingScreen from "../../../CommonUI/LoadingScreen";
import NotFound from "../../../CommonUI/NotFound";
import Standings from "../../../League/Standings/Standings";
import ErrorBanner from '../../../CommonUI/ErrorBanner';

// provider para passar results para dentro de Standings
import { ResultsProvider } from '../../../../providers/ResultsContext';

const SquadStandingsStatistics = ({ leagueID, results }) => {
    const { teamID } = useParams();
    const { leagueData, leagueDataLoading, leagueDataError } = useLeagueData(leagueID);
    
    if (leagueDataLoading) return <LoadingScreen />;
    if (leagueDataError) return <ErrorBanner errorMessage={error.message} />;
    if (!leagueData || leagueData.length === 0) return <NotFound />;

    const currentSeason = leagueData[0]?.seasons.find(season => season.current);
    const hasStandings = currentSeason?.coverage?.standings;
    const leagueType = leagueData[0]?.league?.type;

    if ( !hasStandings || leagueType === 'Cup' ) return <NotFound />;

    return (
        <ResultsProvider results={results}>
            <Standings season={currentSeason.year} type={leagueType} hasStandings={hasStandings} leagueID={leagueID} teamID={teamID} />
        </ResultsProvider>
    )
}

export default SquadStandingsStatistics