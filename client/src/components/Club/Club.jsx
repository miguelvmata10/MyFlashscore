import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Row, Col } from 'react-bootstrap';
import Squad from './Squad';
import TeamLeaguesSelector from './TeamLeaguesSelector';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchClubData } from '../../services/TeamsService';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';

const Club = () => {
    const { teamID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('equipa');
    const { data: clubData, loading, error, fetchData } = useApiRequest(fetchClubData);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);
        }
    }, [teamID, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!clubData || clubData.length === 0) return <NotFound />;

    const renderComponent = () => {
        switch (selected) {
            case 'equipa':
                return <Squad teamID={teamID} />;
            case 'estatisticas':
                return <TeamLeaguesSelector componentToRender='SquadStatistics'/>
            case 'jogos':
                return <TeamLeaguesSelector componentToRender='SquadResults'/>
            default:
                return <div>Erro</div>;
        }
    };

    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <FallbackImage src={clubData[0]?.team?.logo} type='team' alt="Logo do clube"
                        style={{width: '70px', height: '70px', objectFit: 'contain'}}
                    />
                </Col>
                <Col>
                    <h3 className="mb-2">{clubData[0]?.team?.name}</h3>
                    <span>{clubData[0]?.venue?.name}</span><br />
                    <span>Capacidade: {clubData[0]?.venue?.capacity}</span>
                </Col>
                <Col xs="auto">
                    {clubData[0]?.venue?.image && <FallbackImage src={clubData[0]?.venue?.image} width={160} style={{ borderRadius: '10%' }} />}
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup className='w-100'>
                        <Button
                            className={isActiveButton('equipa')}
                            onClick={() => handleButtonState('equipa')}
                        >
                            Equipa
                        </Button>
                        <Button
                            className={isActiveButton('estatisticas')}
                            onClick={() => handleButtonState('estatisticas')}
                        >
                            Estatisticas
                        </Button>
                        <Button 
                            className={isActiveButton('jogos')} 
                            onClick={() => handleButtonState('jogos')}
                        >
                            Jogos
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
export default Club