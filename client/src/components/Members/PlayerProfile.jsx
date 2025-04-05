import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/ui/useButtonGroup';
import useApiRequest from '../../hooks/api/useApiRequest';
import { fetchPlayerData } from '../../services/PeopleService';
import { Row, Col, Container } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import PlayerCarrer from './PlayerCarrer/PlayerCarrer';
import PlayerTrophies from './PlayerCarrer/PlayerTrophies';
import PlayerDetails from './PlayerCarrer/PlayerDetails';
import PlayerSeasonSelector from './PlayerCarrer/PlayerSeasonSelector';

import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import ErrorBanner from '../CommonUI/ErrorBanner';

const PlayerProfile = () => {
    const { playerID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('statistics');
    const { data: playerData, loading, error, fetchData } = useApiRequest(fetchPlayerData);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorBanner errorMessage={error.message} />;
    if (!playerData || playerData.length === 0 ) return <NotFound />;

    const renderComponent = () => {
        switch (selected) {
            case 'statistics':
                return <PlayerSeasonSelector />;
            case 'trophies':
                return <PlayerTrophies />
            case 'transfers':
                return <PlayerCarrer />
            case 'details':
                return <PlayerDetails details={playerData[0]}/>
            default:
                return <div>Erro</div>;
        }
    };

    const player = playerData[0].player;
    
    return (
        <Container>
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <FallbackImage src={player.photo} width={100} type='player' style={{ borderRadius: '10%' }}/>
                </Col>
                <Col>
                    <h3 className="mb-2">{player.name}</h3>
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup size="md" className="w-100">
                        <Button
                            className={isActiveButton('statistics')}
                            onClick={() => handleButtonState('statistics')}
                        >
                            Statistics
                        </Button>
                        <Button
                            className={isActiveButton('trophies')}
                            onClick={() => handleButtonState('trophies')}
                        >
                            Trophies
                        </Button>
                        <Button 
                            className={isActiveButton('transfers')} 
                            onClick={() => handleButtonState('transfers')}
                        >
                            Transfers
                        </Button>
                        <Button
                            className={isActiveButton('details')}
                            onClick={() => handleButtonState('details')}
                        >
                            Details
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
export default PlayerProfile