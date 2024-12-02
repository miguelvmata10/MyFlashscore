import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

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
            {goalkeepers.map(player => (
                <Card key={player.id} style={{ width: '18rem' }}>
                    <Card.Img 
                        variant="top" 
                        src={player.photo} 
                        style={{ maxWidth: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <Card.Text>
                            Número: {player.number}<br />
                            Idade: {player.age}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            
            <h4>Defesas</h4>
            {defenders.map(player => (
                <Card key={player.id} style={{ width: '18rem' }}>
                    <Card.Img 
                        variant="top" 
                        src={player.photo} 
                        style={{ maxWidth: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <Card.Text>
                            Número: {player.number}<br />
                            Idade: {player.age}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
    
            <h4>Médios</h4>
            {midfielders.map(player => (
                <Card key={player.id} style={{ width: '18rem'}}>
                    <Card.Img 
                        variant="top" 
                        src={player.photo} 
                        style={{ maxWidth: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <Card.Text>
                            Número: {player.number}<br />
                            Idade: {player.age}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
    
            <h4>Avançados</h4>
            {forwards.map(player => (
                <Card key={player.id} style={{ width: '18rem'}}>
                    <Card.Img 
                        variant="top" 
                        src={player.photo} 
                        style={{ maxWidth: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <Card.Text>
                            Número: {player.number}<br />
                            Idade: {player.age}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}
export default Squad