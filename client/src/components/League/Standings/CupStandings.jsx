import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApiRequest from '../../../hooks/useApiRequest';
import { fetchLeagueRounds } from '../../../services/CompetitionService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import DisplayCupStandings from './DisplayCupStandings';

const CupStandings = ({ teams, hasStandings, type, season}) => {
    const { leagueID } = useParams();
    const { data: leagueRounds, loading, error, fetchData } = useApiRequest(fetchLeagueRounds);

    useEffect(() => {
        if (leagueID && season) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;

    console.log('TACAAA: ', leagueRounds);

    return (
        <DisplayCupStandings
            teams={ teams }
            hasStandings={ hasStandings }
            type={ type }
            leagueRounds={ leagueRounds }
            season={ season }
        />
    );
};

export default CupStandings;