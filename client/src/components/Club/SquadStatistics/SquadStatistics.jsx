import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { fetchTeamStatistics } from '../../../services/TeamsService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';
import TeamStatsOverview from './TeamStatsOverview';
import PointsPerGameOverview from './PointsPerGameOverview';
import { generateColors } from '../../../utils/helpers';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

const SquadStatistics = ({leagueID, season}) => {
  const { teamID } = useParams()
  const { data: statistics, loading, error, fetchData } = useApiRequest(fetchTeamStatistics);

    useEffect(() => {
      if (teamID && leagueID && season) {
          fetchData(teamID, leagueID, season);    
      }
    }, [teamID, leagueID, season, fetchData])

  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error.message}</p>;
  if (!statistics) return <NotFound />;

  console.log('STATS: ', statistics);

  return (
    <Container className="p-2 mt-2 rounded-4">
        <Row>
            <Col>
                <TeamStatsOverview statistics={statistics} />
                <PointsPerGameOverview statistics={statistics} />
            </Col>
            <Col>
                
            </Col>
        </Row>
    </Container>
  )
}

export default SquadStatistics