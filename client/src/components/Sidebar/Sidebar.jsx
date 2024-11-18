import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import api from '../../services/api';
import Container from 'react-bootstrap/esm/Container';
import { ListGroup, Image, Row, Col } from 'react-bootstrap';
import { auto } from '@popperjs/core';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    // ids das top leagues
    const topLeaguesIDs = [39, 140, 135, 78, 2, 61, 3, 848];

    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para obter as ligas da API
    const fetchAllLeagues = async () => {
        try {
            const response = await api.get('/competitions/leagues');
            const allLeagues = response.data.response;
            setLeagues(filterTopLeagues(allLeagues, topLeaguesIDs)); 
        } catch (error) {
            console.error('Erro ao obter as ligas: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para filtrar as principais ligas da lista global de ligas
    const filterTopLeagues = (allLeagues, topLeaguesIDs) => {
        return allLeagues.filter(l => topLeaguesIDs.includes(l.league.id));
    }

    useEffect(() => {
        fetchAllLeagues();
    }, []);

    if (loading) {
        return <div>Carregando...</div>; 
    }

    return (
        <Container className='container'>
            <ListGroup className=''>
                <ListGroup.Item className='text-center'>
                    <h6><b>Top Leagues</b></h6>
                </ListGroup.Item>
                {leagues.map((topLeague) => (
                    <ListGroup.Item key={topLeague.league.id} className=''>
                        <Row>
                            <Col md={2}>
                                <Image src={topLeague.league.logo} width={30} height={auto}/>
                            </Col>
                            <Col md={10}>
                                {/* Link to={} e depois adicionar no App.jsx a rota*/}
                                <Link className='topLeague'>
                                    <span>
                                        {topLeague.league.name}
                                    </span>
                                </Link>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Sidebar;
