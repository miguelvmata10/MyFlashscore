import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ElementCard from '../CommonUI/ElementCard';
import { fetchSquadInfo } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';

const Squad = ({teamID}) => {
    const { data: teamData, loading: teamloading, error: teamError, fetchData: fetchTeamData } = useApiRequest(fetchSquadInfo);

    useEffect(() => {
        if (teamID) {
            fetchTeamData(teamID);
        }
    }, [teamID, fetchTeamData]);

    if (teamloading) return <LoadingScreen />;
    if (teamError) return <p>Erro: {teamError.message}</p>;
    if (!teamData) return <p>Nenhum dado para a equipa disponível.</p>;

    // Verifica se squad e squad[0] existem antes de tentar acessar players
    const players = teamData && teamData[0] ? teamData[0].players : [];

    const goalkeepers = players.filter(player => player.position === 'Goalkeeper');
    const defenders = players.filter(player => player.position === 'Defender');
    const midfielders = players.filter(player => player.position === 'Midfielder');
    const forwards = players.filter(player => player.position === 'Attacker');

    return (
        <>
            <h4>Guarda-redes</h4>
            <Row className='g-1'>
                {goalkeepers.map(player => (
                    <Col md={4}>
                        <ElementCard 
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                            key={player.id}
                        />
                    </Col>
                ))}
            </Row>
            <h4>Defesas</h4>
            <Row className='g-1'>
                {defenders.map(player => (
                    <Col md={4}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                            key={player.id}
                        />
                    </Col>
                ))}
            </Row>
    
            <h4>Médios</h4>
            <Row className='g-1'>
                {midfielders.map(player => (
                    <Col md={4}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                            key={player.id}
                        />
                    </Col>
                ))}
            </Row>
    
            <h4>Avançados</h4>
            <Row className='g-1'>
                {forwards.map(player => (
                    <Col md={4}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                            key={player.id}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}
export default Squad