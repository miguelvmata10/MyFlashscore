import React, { useEffect, useState } from 'react';
import useButtonGroup from '../../hooks/useButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Table, Image, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import './Statistics.css';
import { Link } from "react-router-dom";
import LoadingScreen from '../CommonUI/LoadingScreen';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchTopScorers, fetchTopAssisters } from '../../services/CompetitionService';

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
        <Table striped hover responsive variant="dark">
          <thead>
            <tr>
              <th>º</th>
              <th>Jogador</th>
              <th>Equipa</th>
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
                  <td>
                    <Image className='imageResize' src={playerData.photo} />
                    <span className='ms-3'>
                      <Link to={`/player/${playerData?.id}`} className="customLink">
                        {playerData?.name || 'N/A'}
                      </Link>
                    </span>
                  </td>
                  <td>{teamName}</td>
                  <td>{gamesAppearances}</td>
                  <td>{goalsTotal}</td>
                  <td>{assistsTotal}</td>
                  <td>{rating}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default TopScorersAndAssists