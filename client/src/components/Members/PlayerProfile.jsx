import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchPlayerData } from '../../services/PeopleService';
import { Container, Image, Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { PlayerCarrer, PlayerTrophies } from './PlayerCarrer';

const PlayerProfile = () => {
    const { playerID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('estatisticas');
    const { data: playerData, loading, error, fetchData } = useApiRequest(fetchPlayerData);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
        console.log('DADOS DO JOGADOR: ', playerData);
    }, [playerID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerData) return <p>Nenhum dado disponível.</p>;

    const renderComponent = () => {
        switch (selected) {
            case 'estatisticas':
                return <div>Estatisticas</div>;
            case 'trofeus':
                return <PlayerTrophies />
            case 'transferencias':
                return <PlayerCarrer />
            case 'dadosPessoais':
                return <div>DadosPessoais</div>;
            default:
                return <div>Erro</div>;
        }
    };

    const translateToPortuguese = (position) => {
        switch (position) {
            case 'Goalkeeper':
                return 'Guarda-redes';
            case 'Defender':
                return 'Defesa';
            case 'Midfielder':
                return 'Médio';
            case 'Attacker':
                return 'Avançado';
            default:
                return 'N/A';
        }
    }

    const player = playerData[0].player;
    
    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Image src={player.photo} width={150} alt="Foto do jogador" style={{ borderRadius: '10%' }}/>
                </Col>
                <Col>
                    <h3 className="mb-2">{player.name}</h3>
                    <span>Número: {player.number}</span><br />
                    <span>Posição: {translateToPortuguese(player.position)}</span><br />
                    <span>Idade: {player.age}</span><br />
                    <span>Nacionalidade: {player.birth.country}</span>
                </Col>
            </Row>
            <Row>
                <ButtonGroup size="md">
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
                        className={isActiveButton('dadosPessoais')}
                        onClick={() => handleButtonState('dadosPessoais')}
                    >
                        Dados pessoais
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
export default PlayerProfile