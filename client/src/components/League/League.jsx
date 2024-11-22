import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Container from 'react-bootstrap/esm/Container';
import { Image, Row, Col } from 'react-bootstrap';

const League = () => {
    // obter o id pela URL
    const { leagueID } = useParams();
    const [leagueData, setLeagueData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLeagueData = async () => {
        try {
            const response = await api.get(`/competitions/leagues/${leagueID}`); 
            setLeagueData(response.data.response);
            console.log('Dados da liga:', leagueData);  
        } catch (error) {
            console.error('Erro ao obter os dados da liga: ', error);
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        fetchLeagueData();
    }, [leagueID]);


    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Container fluid>
            <Image src={leagueData[0].league.logo} width={100} height={100} alt="Logo da liga" />
            <h1>{leagueData[0].league.name}</h1>
        </Container>
    );
};

export default League;
