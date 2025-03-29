import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { fetchTeamStatistics } from '../../../services/TeamsService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';
import GenericStatsTable from './GenericStatsTable';
import GamesModal from './SquadGamesStatistics/GamesModal';
import GoalsModal from './SquadGoalsStatistics/GoalsModal';
import { generateColors } from '../../../utils/helpers';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

const SquadStatistics = ({leagueID, season}) => {
  const { teamID } = useParams();
  const { data: statistics, loading, error, fetchData } = useApiRequest(fetchTeamStatistics);
  const [ showGamesModal, setShowGamesModal ] = useState(false);
  const [ showGoalsModal, setShowGoalsModal ] = useState(false);

  const handleShowModal = ( modalType ) => {
    modalType === 'games' ? setShowGamesModal(true) : setShowGoalsModal(true);
  }

  const handleCloseModal = ( modalType ) => {
    modalType === 'games' ? setShowGamesModal(false) : setShowGoalsModal(false);
  }

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
              <h6 className="text-center">Games</h6> 
              <GenericStatsTable statistics={statistics} typeOfTable='games' />
              <div className='text-start mb-2'>
                <Button variant="outline-secondary" size="sm" onClick={() => handleShowModal("games")}>
                  Ver mais 
                </Button>
              </div>
              <GamesModal show={showGamesModal} statistics={statistics} onClose={() => handleCloseModal("games")} />
          </Col>
          <Col>
              <h6 className="text-center">Goals</h6> 
              <GenericStatsTable statistics={statistics} typeOfTable='goals' />
              <div className='text-end mb-2'>
                <Button variant="outline-secondary" size="sm" onClick={() => handleShowModal("goals")}>
                  Ver mais 
                </Button>
              </div>
              <GoalsModal show={showGoalsModal} statistics={statistics} onClose={() => handleCloseModal("goals")} />
          </Col>
      </Row>
    </Container>
  )
}

export default SquadStatistics