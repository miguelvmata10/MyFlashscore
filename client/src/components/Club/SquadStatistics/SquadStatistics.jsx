import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchTeamStatistics } from '../../../services/TeamsService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/api/useApiRequest';
import NotFound from '../../CommonUI/NotFound';
import SquadRankAndMatchesStats from './SquadRankAndRecentMatchesStats/SquadRankAndMatchesStats';
import SquadGameGoalStats from './SquadGameGoalsStatistics/SquadGameGoalStats';
import ErrorBanner from '../../CommonUI/ErrorBanner';

const SquadStatistics = ({leagueID, season}) => {
  const { teamID } = useParams();
  const { data: statistics, loading, error, fetchData } = useApiRequest(fetchTeamStatistics);

  useEffect(() => {
    if (teamID && leagueID && season) {
        fetchData(teamID, leagueID, season);    
    }
  }, [teamID, leagueID, season, fetchData])

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorBanner errorMessage={error.message} />;
  if (!statistics) return <NotFound />;

  return (
    <Container className="p-2 mt-2 rounded-4">
        <SquadRankAndMatchesStats leagueID={leagueID} season={season} />
        <SquadGameGoalStats statistics={statistics} />
    </Container>
  )
}

export default SquadStatistics