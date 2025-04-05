import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/ui/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Row, Col } from 'react-bootstrap';
import Squad from './Squad';
import TeamLeaguesSelector from './TeamLeaguesSelector';
import useApiRequest from '../../hooks/api/useApiRequest';
import { fetchClubData } from '../../services/TeamsService';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import ErrorBanner from '../CommonUI/ErrorBanner';

const Club = () => {
    const { teamID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('squad');
    const { data: clubData, loading, error, fetchData } = useApiRequest(fetchClubData);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);
        }
    }, [teamID, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorBanner errorMessage={error.message} />;
    if (!clubData || clubData.length === 0) return <NotFound />;

    const renderComponent = () => {
        switch (selected) {
            case 'squad':
                return <Squad teamID={teamID} />;
            case 'statistics':
                return <TeamLeaguesSelector componentToRender='SquadStatistics'/>
            case 'games':
                return <TeamLeaguesSelector componentToRender='SquadResults'/>
            default:
                return <div>Erro</div>;
        }
    };

    return (
        <Container>
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
                <Col xs="auto" className='d-none d-lg-block'>
                    {clubData[0]?.venue?.image && <FallbackImage src={clubData[0]?.venue?.image} width={160} style={{ borderRadius: '10%' }} />}
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup className='w-100'>
                        <Button
                            className={isActiveButton('squad')}
                            onClick={() => handleButtonState('squad')}
                        >
                            Squad
                        </Button>
                        <Button
                            className={isActiveButton('statistics')}
                            onClick={() => handleButtonState('statistics')}
                        >
                            Statistics
                        </Button>
                        <Button 
                            className={isActiveButton('games')} 
                            onClick={() => handleButtonState('games')}
                        >
                            Games
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