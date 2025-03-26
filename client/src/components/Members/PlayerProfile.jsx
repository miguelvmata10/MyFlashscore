import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchPlayerData } from '../../services/PeopleService';
import { Container, Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import PlayerCarrer from './PlayerCarrer/PlayerCarrer';
import PlayerTrophies from './PlayerCarrer/PlayerTrophies';
import PlayerDetails from './PlayerCarrer/PlayerDetails';
import PlayerSeasonSelector from './PlayerCarrer/PlayerSeasonSelector';

import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';

const PlayerProfile = () => {
    const { playerID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('estatisticas');
    const { data: playerData, loading, error, fetchData } = useApiRequest(fetchPlayerData);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerData || playerData.length === 0 ) return <NotFound />;

    const renderComponent = () => {
        switch (selected) {
            case 'estatisticas':
                return <PlayerSeasonSelector />;
            case 'trofeus':
                return <PlayerTrophies />
            case 'transferencias':
                return <PlayerCarrer />
            case 'detalhes':
                return <PlayerDetails details={playerData[0]}/>
            default:
                return <div>Erro</div>;
        }
    };

    const player = playerData[0].player;
    
    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <FallbackImage src={player.photo} width={110} type='player' alt="Foto do jogador" style={{ borderRadius: '10%' }}/>
                </Col>
                <Col>
                    <h3 className="mb-2">{player.name}</h3>
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup size="md" className="w-100">
                        <Button
                            className={isActiveButton('estatisticas')}
                            onClick={() => handleButtonState('estatisticas')}
                        >
                            Estatisticas
                        </Button>
                        <Button
                            className={isActiveButton('trofeus')}
                            onClick={() => handleButtonState('trofeus')}
                        >
                            Troféus
                        </Button>
                        <Button 
                            className={isActiveButton('transferencias')} 
                            onClick={() => handleButtonState('transferencias')}
                        >
                            Transferências
                        </Button>
                        <Button
                            className={isActiveButton('detalhes')}
                            onClick={() => handleButtonState('detalhes')}
                        >
                            Detalhes
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