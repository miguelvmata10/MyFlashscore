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
import LastLeagueGames from './LastLeagueGames';

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

  const GameAndGoalStats = () => {
    return (
      <>
        {['games', 'goals'].map((type) => {
          const title = type === 'games' ? 'Games' : 'Goals';
          const textPosition = type === 'games' ? 'start' : 'end';
          const showTypeModal = type === 'games' ? showGamesModal : showGoalsModal;

          return (
            <Col key={type}>
              <h6 className="text-center">{title}</h6>
              <GenericStatsTable statistics={statistics} typeOfTable={type} />
              <div className={`text-${textPosition} mb-2`}>
                <Button variant="outline-secondary" size="sm" onClick={() => handleShowModal(type)}>
                  Ver mais
                </Button>
              </div>
              {type === 'games' ? (
                  <GamesModal show={showTypeModal} statistics={statistics} onClose={() => handleCloseModal(type)} />
                ) : (
                  <GoalsModal show={showTypeModal} statistics={statistics} onClose={() => handleCloseModal(type)} />
                ) 
              }
            </Col>
          );
        })}
      </>
    );
  };

  return (
    <Container className="p-2 mt-2 rounded-4">
      <Row className='mb-3 text-center'>
        <Col>
          <h6>Team standings</h6>
        </Col>
        <Col>
          <h6>Last Games</h6>
          <LastLeagueGames leagueID={leagueID} season={season} />
        </Col>
      </Row>
      <Row>
        <GameAndGoalStats />
      </Row>
    </Container>
  )
}

export default SquadStatistics