import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Accordion } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { fetchPlayerStatistics} from '../../../services/PeopleService';
import ElementCard from '../../CommonUI/ElementCard';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';
import FallbackImage from '../../CommonUI/FallbackImage';


const PlayerStatistics = ({season}) => {
    const { playerID } = useParams();
    const { data: playerStatistics, loading, error, fetchData } = useApiRequest(fetchPlayerStatistics);
    const [ uniqueClubs, setUniqueClubs ] = useState({});
  
    useEffect(() => {
        if (playerID && season) {
            fetchData(playerID, season);
        }

    }, [playerID, season, fetchData]);

    useEffect(() => {
        if (!playerStatistics || playerStatistics.length === 0) return; 
            const stats = playerStatistics[0].statistics;
            const uniqueClubs = {};

            stats.forEach(({team}) => {
                if (!uniqueClubs[team.id] && team && team.name) {
                    uniqueClubs[team.id] = {
                        id: team.id,
                        name: team.name,
                        logo: team.logo
                    }
                }
            });

            setUniqueClubs(uniqueClubs);
        
    }, [playerStatistics]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerStatistics || playerStatistics.length === 0) return <NotFound />;
    
    const stats = playerStatistics[0].statistics;
    
    return (
        <Container>
            {/* Clubes onde o jogador jogou na época */}
            <Row>
                {Object.values(uniqueClubs).map((club, index) => (
                    <Col key={index} md={6}>
                        <ElementCard 
                            role='team'
                            id={club.id}
                            photo={club.logo}
                            name={club.name}
                            key={club.id}
                        />
                    </Col>
                ))}
            </Row>
            
            {/* Estatísticas por liga */}
            <Accordion>
                {stats.map((stat, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index} className='bg-transparent'>
                        <Accordion.Header>
                            <FallbackImage src={stat.league.logo} type='league' className="me-2 imageResize" />
                            {stat.league.name} ({stat.league.season})
                        </Accordion.Header>
                        <Accordion.Body>
                            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                <Table striped hover responsive variant="dark" className='text-center'>
                                    <thead>
                                        <tr>
                                            <th>Games</th>
                                            <th>Minutes</th>
                                            <th>Goals</th>
                                            <th>Assists</th>
                                            <th>Yellow cards</th>
                                            <th>Red cards</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{stat.games.appearences ?? 0}</td>
                                            <td>{stat.games.minutes ?? 0}</td>
                                            <td>{stat.goals.total ?? 0}</td>
                                            <td>{stat.goals.assists ?? 0}</td>
                                            <td>{stat.cards.yellow ?? 0}</td>
                                            <td>{stat.cards.red ?? 0}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container> 
    )
}

export default PlayerStatistics