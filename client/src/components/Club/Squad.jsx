import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import api from '../../services/api';

const Squad = ({teamID}) => {

    const [ squad, setSquad ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const fetchSquad = async () => {
        try {
            const response = await api.get('/teams/squad', {
                params: {
                    team: teamID,
                },
              });
            setSquad(response.data.response);
        } catch (error) {
            console.error('Erro ao obter os dados do clube: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSquad();
    }, [teamID]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    // Verifica se squad e squad[0] existem antes de tentar acessar players
    const players = squad && squad[0] ? squad[0].players : [];

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