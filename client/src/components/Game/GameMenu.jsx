import React, { useEffect } from 'react';
import { Image, Row, Col, ButtonGroup, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchGame } from '../../services/GameService';
import LoadingScreen from '../CommonUI/LoadingScreen';
import GameLineups from './GameLineups';
import GameSummary from './GameSummary';
import GameStatistics from './GameStatistics';
import NotFound from '../CommonUI/NotFound';
import './GameStyles.css'

const GameMenu = () => {
  const { fixtureID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('sumario');
  const { data: gameData, loading, error, fetchData } = useApiRequest(fetchGame);

  useEffect(() => {
      if (fixtureID) {
          fetchData(fixtureID);
      }
  }, [fixtureID, fetchData]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error.message}</p>;
  if (!gameData || gameData.length === 0) return <NotFound />;

  const game = gameData[0];
  console.log('papapapa: ', game);

  const renderComponent = () => {
    switch (selected) {
      case 'sumario':
          // passar o id da equipa da casa via prop para saber que eventos mostrar 
          // em que lado do ecrã no menu de <GameSummary> 
          return <GameSummary events={game.events} homeTeam={game.teams.home.id} />;
      case 'formacoes':
          return <GameLineups lineups={game.lineups} />
      case 'estatisticas':
          return <GameStatistics stats={game.statistics} />
      default:
          return <div>Erro</div>;
    };
  }

  return (
    <Container className="container ps-5 pe-5 pt-5">
      <Row className="align-items-start justify-content-center py-3">
        <Col className="text-center">
          <div className="bg-white rounded-4 d-inline-flex justify-content-center align-items-center p-2" 
            style={{ width: '100px', height: '100px', maxWidth: '100%', aspectRatio: '1/1' }}>
              <Image 
              src={game.teams.home.logo}  
              fluid 
              className="mx-auto" 
              style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
          </div>
          <Link to={`/team/${game.teams.home.id}`} className='customLink'>
            <h5 className="mt-3">
                  {game.teams.home.name}
            </h5>
          </Link>
        </Col>
        
        <Col className="text-center">
          <h2 className="display-4 text-danger fw-bold">
            {game.score.fulltime.home} - {game.score.fulltime.away}
          </h2>
        </Col>
        
        <Col className="text-center">
          <div className="bg-white rounded-4 d-inline-flex justify-content-center align-items-center p-2" 
            style={{ width: '100px', height: '100px', maxWidth: '100%', aspectRatio: '1/1' }}>
              <Image 
              src={game.teams.away.logo} 
              fluid 
              className="mx-auto" 
              style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
          </div>
          <Link to={`/team/${game.teams.away.id}`} className='customLink'>
            <h5 className="mt-3">
                  {game.teams.away.name}
            </h5>
          </Link>
        </Col>
      </Row>
      <hr />
      <Row>
        <ButtonGroup className='custom-button mb-4 w-50' size="md">
          <Button
              className={isActiveButton('sumario')}
              onClick={() => handleButtonState('sumario')}
          >
              Sumário
          </Button>
          <Button
              className={isActiveButton('formacoes')}
              onClick={() => handleButtonState('formacoes')}
          >
              Formações
          </Button>
          <Button 
              className={isActiveButton('estatisticas')} 
              onClick={() => handleButtonState('estatisticas')}
          >
              Estatísticas
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        {renderComponent()}
      </Row>
    </Container>
  )
}
export default GameMenu