import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import { fetchSquadInfo } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';

const Squad = ({teamID}) => {
    const { data: teamData, loading, error, fetchData } = useApiRequest(fetchSquadInfo);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);
        }
    }, [teamID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!teamData) return <p>Nenhum dado disponível.</p>;

    // Verifica se squad e squad[0] existem antes de tentar acessar players
    const players = teamData && teamData[0] ? teamData[0].players : [];

    const goalkeepers = players.filter(player => player.position === 'Goalkeeper');
    const defenders = players.filter(player => player.position === 'Defender');
    const midfielders = players.filter(player => player.position === 'Midfielder');
    const forwards = players.filter(player => player.position === 'Attacker');

    return (
        <>
            <h4>Guarda-redes</h4>
            <Row className='g-3'>
                {goalkeepers.map(player => (
                    <Col key={player.id} md={4}>
                        <PlayerCard id={player.id} photo={player.photo} name={player.name} number={player.number} age={player.age} />
                    </Col>
                ))}
            </Row>
            
            <h4>Defesas</h4>
            <Row className='g-3'>
                {defenders.map(player => (
                    <Col key={player.id} md={4}>
                        <PlayerCard id={player.id} photo={player.photo} name={player.name} number={player.number} age={player.age} />
                    </Col>
                ))}
            </Row>
    
            <h4>Médios</h4>
            <Row className='g-3'>
                {midfielders.map(player => (
                    <Col key={player.id} md={4}>
                        <PlayerCard id={player.id} photo={player.photo} name={player.name} number={player.number} age={player.age} />
                    </Col>
                ))}
            </Row>
    
            <h4>Avançados</h4>
            <Row className='g-3'>
                {forwards.map(player => (
                    <Col key={player.id} md={4}>
                        <PlayerCard id={player.id} photo={player.photo} name={player.name} number={player.number} age={player.age} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
export default Squad