import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApiRequest from './useApiRequest';
import { fetchTeamResults } from '../services/TeamsService';

const useTeamResults = ( leagueID, season ) => {
  const { teamID } = useParams()
  const { data: results, loading: resultsLoading, error: resultsError, fetchData: resultsFetchData } = useApiRequest(fetchTeamResults);

  useEffect(() => {
    if (teamID && leagueID && season) {
        resultsFetchData(teamID, leagueID, season);    
    }
  }, [teamID, leagueID, season, resultsFetchData])

  return { results, resultsLoading, resultsError };
}
export default useTeamResults