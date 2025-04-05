import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/ui/useButtonGroup';
import useApiRequest from '../../hooks/api/useApiRequest';
import { fetchCoachData } from '../../services/PeopleService';
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap';
import CoachCarrer from './CoachCarrer/CoachCarrer';
import CoachTrophies from './CoachCarrer/CoachTrophies';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import ErrorBanner from '../CommonUI/ErrorBanner';

const CoachProfile = () => {
  const { coachID } = useParams();
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('carrer');
  const { data: coachData, loading, error, fetchData } = useApiRequest(fetchCoachData);

  useEffect(() => {
      if (coachID) {
          fetchData(coachID);
      }
  }, [coachID, fetchData]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorBanner errorMessage={error.message} />;
  if (!coachData || coachData.length === 0 ) return <NotFound />;

  const coach = coachData[0];

  const renderComponent = () => {
    switch (selected) {
        case 'carrer':
            return <CoachCarrer carrer={coach.career}/>
        case 'trophies':
            return <CoachTrophies />
        default:
            return <div>Erro</div>;
    }
  };

    return (
        <Container>
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <FallbackImage src={coach.photo} width={110} type='player' alt="Foto do treinador" style={{ borderRadius: '10%' }}/>
                </Col>
                <Col>
                <h3 className="mb-2">{coach.name}</h3>
                <span>Age: {coach.birth.date} ({coach.age})</span><br />
                <span>Country: {coach.nationality}</span><br />
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup size="md" className="w-100">
                        <Button
                            className={isActiveButton('carrer')}
                            onClick={() => handleButtonState('carrer')}
                        >
                            Carrer
                        </Button>
                        <Button
                            className={isActiveButton('trophies')}
                            onClick={() => handleButtonState('trophies')}
                        >
                            Trophies
                        </Button>
                    </ButtonGroup>
                </div>
                <hr />
            </Row>
            <Row>
                {renderComponent()}
            </Row>
        </Container>
    )
}

export default CoachProfile