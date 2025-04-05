import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApiRequest from '../../../../hooks/api/useApiRequest';
import { fetchLeagueRounds } from '../../../../services/CompetitionService';
import LoadingScreen from '../../../CommonUI/LoadingScreen';
import DisplayCupStandings from './DisplayCupStandings';
import ErrorBanner from '../../../CommonUI/ErrorBanner';

const CupStandings = ({ teams, hasStandings, type, season, teamID = null }) => {
    const { leagueID } = useParams();
    const { data: leagueRounds, loading, error, fetchData } = useApiRequest(fetchLeagueRounds);

    useEffect(() => {
        if (leagueID && season) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorBanner errorMessage={error.message} />;

    return (
        <DisplayCupStandings
            teams={ teams }
            hasStandings={ hasStandings }
            type={ type }
            leagueRounds={ leagueRounds }
            season={ season }
            teamID={teamID}
        />
    );
};

export default CupStandings;