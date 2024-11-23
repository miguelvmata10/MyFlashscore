import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import api from '../../services/api';
import Container from 'react-bootstrap/esm/Container';
import { ButtonGroup, Button, Image, Row, Col } from 'react-bootstrap';
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
        <Container className='container p-3 rounded-4 mb-2'>
            <div className='text-center mb-3'>
                    <h4><b>Top Leagues</b></h4>
            </div>
            <ButtonGroup vertical>
                {leagues.map((topLeague) => (
                    <Button className='d-flex mb-2' as={Link} to={`/league/${topLeague.league.id}`} key={topLeague.league.id}>
                        <Image className='' src={topLeague.league.logo} width={25} height={auto}/>
                        <span>{topLeague.league.name}</span>
                    </Button>
                ))}
            </ButtonGroup>
        </Container>
    );
};

export default Sidebar;
