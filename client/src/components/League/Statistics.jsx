import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import useButtonGroup from '../../hooks/useButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Table, Image, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import './Statistics.css';

const Statistics = ({leagueID, season}) => {

  const [ topScorers, setTopScorers ] = useState([]);
  const [ topAssisters, setTopAssisters ] = useState([]);
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('marcadores');
  const [ loading, setLoading ] = useState(true);

  // Função genérica para ir buscar os dados à API => TALVEZ COLOCAR NUM FICHEIRO À PARTE PARA USAR NOUTROS COMPS
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await api.get(endpoint, {
        params: {
          league: leagueID,
          season: season,
        },
      });
      setter(response.data.response); 
    } catch (error) {
      console.error(`Erro ao obter dados de ${endpoint}:`, error.response || error.message);
    } finally {
      setLoading(false); 
    }
  };
  
  const fetchTopScorers = () => fetchData('/competitions/league/topScorers', setTopScorers);
  console.log('MELHORES MARCADORES: ', topScorers);
  const fetchTopAssisters = () => fetchData('/competitions/league/topAssisters', setTopAssisters);

  useEffect(() => {
    fetchTopScorers();
    fetchTopAssisters();
  }, [leagueID, season]);

  if (loading) {
    return <div>Carregando...</div>
  }

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
                    <span className='ms-3'>{playerData?.name || 'N/A'}</span>
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

export default Statistics