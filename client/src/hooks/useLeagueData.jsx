import React, { useEffect } from 'react';
import useApiRequest from './useApiRequest';
import { fetchLeagueData } from '../services/CompetitionService';

const useLeagueData = ( leagueID ) => {
    const { data: leagueData, loading: leagueDataLoading, error: leagueDataError, fetchData: leagueDataFetchData } = useApiRequest(fetchLeagueData);

    useEffect(() => {
        if (leagueID) {
            leagueDataFetchData(leagueID);
        }
    }, [leagueID, leagueDataFetchData]);

    return { leagueData, leagueDataLoading, leagueDataError }
}

export default useLeagueData;