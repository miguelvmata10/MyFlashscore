import React, { useEffect } from 'react';
import { Row, ButtonGroup, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../../hooks/ui/useButtonGroup';
import useApiRequest from '../../../hooks/api/useApiRequest';
import { fetchGame } from '../../../services/GameService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import GameLineups from '../GameLineups/GameLineups';
import GameSummary from '../GameSummary/GameSummary';
import GameStatistics from '../GameStatistics';
import NotFound from '../../CommonUI/NotFound';
import '../GameStyles.css'
import GameHeader from './GameHeader';
import ErrorBanner from '../../CommonUI/ErrorBanner';

const GameMenu = () => {
  const { fixtureID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('summary');
  const { data: gameData, loading, error, fetchData } = useApiRequest(fetchGame);

  useEffect(() => {
      if (fixtureID) {
          fetchData(fixtureID);
      }
  }, [fixtureID, fetchData]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorBanner errorMessage={error.message} />;
  if (!gameData || gameData.length === 0) return <NotFound />;

  const game = gameData[0];

  const renderComponent = () => {
    switch (selected) {
      case 'summary':
          // passar o id da equipa da casa via prop para saber que eventos mostrar 
          // em que lado do ecrã no menu de <GameSummary> 
          return <GameSummary events={game.events} homeTeam={game.teams.home.id} />;
      case 'lineups':
          return <GameLineups lineups={game.lineups} players={game.players} />
      case 'statistics':
          return <GameStatistics stats={game.statistics} />
      default:
          return <div>Erro</div>;
    };
  }


  return (
    <Container>
      <GameHeader 
        homeTeam={game.teams.home}
        awayTeam={game.teams.away}
        fixture={game.fixture}
        score={game.score}
      />
      <hr />
      <Row>
        <div className='overflow-auto'>
          <ButtonGroup className='custom-button mb-4 w-50' size="md">
            <Button
                className={isActiveButton('summary')}
                onClick={() => handleButtonState('summary')}
            >
                Summary
            </Button>
            <Button
                className={isActiveButton('lineups')}
                onClick={() => handleButtonState('lineups')}
            >
                Lineups
            </Button>
            <Button 
                className={isActiveButton('statistics')} 
                onClick={() => handleButtonState('statistics')}
            >
                Statistics
            </Button>
          </ButtonGroup>
        </div>
      </Row>
      <Row>
        {renderComponent()}
      </Row>
    </Container>
  )
}
export default GameMenu