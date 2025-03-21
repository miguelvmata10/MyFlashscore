import React, { useEffect } from 'react';
import { Button, ButtonGroup, Table, Row, Container, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import { fetchTopScorers, fetchTopAssisters } from '../../services/CompetitionService';
import { formatBadge } from '../../utils/helpers';
import './Statistics.css';


const TopScorersAndAssists = ({ season }) => {
  const { leagueID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('marcadores');

  const { data: topScorers, loading: loadingScorers, error: errorScorers, fetchData: fetchScorers } = useApiRequest(fetchTopScorers);
  const { data: topAssisters, loading: loadingAssisters, error: errorAssisters, fetchData: fetchAssisters } = useApiRequest(fetchTopAssisters);

  useEffect(() => {
    if (leagueID && season) {
        fetchScorers(leagueID, season);
        fetchAssisters(leagueID, season);
    }
  }, [leagueID, season, fetchScorers, fetchAssisters]);

  if (loadingScorers || loadingAssisters) return <LoadingScreen />;
  if (errorScorers) return <p>Erro: {errorScorers.message}</p>;
  if (errorAssisters) return <p>Erro: {errorAssisters.message}</p>;
  if (!topScorers || topScorers.length === 0 ) return <NotFound />;
  if (!topAssisters || topAssisters.length === 0 ) return <NotFound />;

  const dataToDisplay = selected === 'marcadores' ? topScorers : topAssisters;

  if (!dataToDisplay || dataToDisplay.length === 0) {
    return <div>Não temos dados para esta época. Sorry!</div>
  }

  return (
    <Container className='container rounded-4'>
        <ButtonGroup size='sm' className='custom-button mb-3'>
            <Button className={isActiveButton('marcadores')} onClick={() => handleButtonState('marcadores')}>
                Marcadores
            </Button>
            <Button className={isActiveButton('assistentes')} onClick={() => handleButtonState('assistentes')}>
                Assistentes
            </Button>
        </ButtonGroup> 
      <Row>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Table striped hover responsive variant="dark" className='text-center'>
            <thead>
              <tr>
                <th>º</th>
                <th className='text-start'>Jogador</th>
                <th className='text-start'>Equipa</th>
                <th>PJ</th>
                <th>G</th>
                <th>A</th>
                <th>N</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((player, index) => {
                const playerData = player?.player;
                const stats = player?.statistics?.[0]; 
                const teamName = stats?.team?.name || 'N/A'; 
                const gamesAppearances = stats?.games?.appearences || 'N/A';
                const goalsTotal = stats?.goals?.total || 0;
                const assistsTotal = stats?.goals?.assists || 0;
                const rating = stats?.games?.rating ? parseFloat(stats.games.rating).toFixed(1) : 'N/A';

                return (
                  <tr key={playerData?.id} className='p-2'>
                    <td>{index + 1}</td>
                    <td className='text-start'>
                      <FallbackImage className='imageResize' type='player' src={playerData.photo} />
                      <span className='ms-3'>
                        <Link to={`/player/${playerData?.id}`} className="customLink">
                          {playerData?.name || 'N/A'}
                        </Link>
                      </span>
                    </td>
                    <td className='text-start'>{teamName}</td>
                    <td>{gamesAppearances}</td>
                    <td>{goalsTotal}</td>
                    <td>{assistsTotal}</td>
                    <td>
                      <Badge bg={formatBadge(rating)}>{rating}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  )
}

export default TopScorersAndAssists