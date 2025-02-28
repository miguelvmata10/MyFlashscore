import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchCoachData } from '../../services/PeopleService';
import { Container, Image, Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { CoachCarrer, CoachTrophies } from './CoachCarrer';

const CoachProfile = () => {
  const { coachID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('carreira');
  const { data: coachData, loading, error, fetchData } = useApiRequest(fetchCoachData);

  useEffect(() => {
      if (coachID) {
          fetchData(coachID);
      }
  }, [coachID, fetchData]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!coachData) return <p>Nenhum dado disponível.</p>;

  const coach = coachData[0];

  const renderComponent = () => {
    switch (selected) {
        case 'carreira':
            return <CoachCarrer carrer={coach.career}/>
        case 'trofeus':
            return <CoachTrophies />
        default:
            return <div>Erro</div>;
    }
  };

    return (
    <Container className="container p-5 rounded-4">
        <Row className="align-items-center mb-3">
            <Col xs="auto">
                <Image src={coach.photo} width={150} alt="Foto do treinador" style={{ borderRadius: '10%' }}/>
            </Col>
            <Col>
              <h3 className="mb-2">{coach.name}</h3>
              <span>Cargo: Treinador</span><br />
              <span>Idade: {coach.birth.date} ({coach.age})</span><br />
              <span>Nacionalidade: {coach.nationality}</span><br />
            </Col>
        </Row>
        <Row>
          <ButtonGroup size="md">
              <Button
                  className={isActiveButton('carreira')}
                  onClick={() => handleButtonState('carreira')}
              >
                  Carreira
              </Button>
              <Button
                  className={isActiveButton('trofeus')}
                  onClick={() => handleButtonState('trofeus')}
              >
                  Troféus
              </Button>
          </ButtonGroup>
          <hr />
        </Row>
        <Row>
            {renderComponent()}
        </Row>
    </Container>
    )
}
export default CoachProfile