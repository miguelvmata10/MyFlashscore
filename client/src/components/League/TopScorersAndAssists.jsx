import React, { useEffect } from 'react';
import { Button, ButtonGroup, Table, Row, Container, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useButtonGroup from '../../hooks/ui/useButtonGroup';
import useApiRequest from '../../hooks/api/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import { fetchTopScorers, fetchTopAssisters } from '../../services/CompetitionService';
import { formatBadge } from '../../utils/helpers';
import ErrorBanner from '../CommonUI/ErrorBanner';

const TopScorersAndAssists = ({ season }) => {
  const { leagueID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('scorers');

  const { data: topScorers, loading: loadingScorers, error: errorScorers, fetchData: fetchScorers } = useApiRequest(fetchTopScorers);
  const { data: topAssisters, loading: loadingAssisters, error: errorAssisters, fetchData: fetchAssisters } = useApiRequest(fetchTopAssisters);

  useEffect(() => {
    if (leagueID && season) {
        fetchScorers(leagueID, season);
        fetchAssisters(leagueID, season);
    }
  }, [leagueID, season, fetchScorers, fetchAssisters]);

  if (loadingScorers || loadingAssisters) return <LoadingScreen />;
  if (errorScorers) return <ErrorBanner errorMessage={errorScorers.message} />;
  if (errorAssisters) return <ErrorBanner errorMessage={errorAssisters.message} />;
  if (!topScorers || topScorers.length === 0 ) return <NotFound />;
  if (!topAssisters || topAssisters.length === 0 ) return <NotFound />;

  const dataToDisplay = selected === 'scorers' ? topScorers : topAssisters;

  if (!dataToDisplay || dataToDisplay.length === 0) {
    return <NotFound />
  }

  return (
    <Container className='container rounded-4'>
        <ButtonGroup size='sm' className='custom-button mb-3'>
            <Button className={isActiveButton('scorers')} onClick={() => handleButtonState('scorers')}>
                Scorers
            </Button>
            <Button className={isActiveButton('assisters')} onClick={() => handleButtonState('assisters')}>
                Assisters
            </Button>
        </ButtonGroup> 
      <Row>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Table striped hover responsive variant="dark" className='text-center'>
            <thead>
              <tr>
                <th>º</th>
                <th className='text-start'>Player</th>
                <th className='text-start'>Team</th>
                <th>GP</th>
                <th>G</th>
                <th>A</th>
                <th>R</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((player, index) => {
                const playerData = player?.player || 'Unknown';
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