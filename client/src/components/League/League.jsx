import React, { useEffect, useState } from 'react';
import './League.css';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Image, Row, Col } from 'react-bootstrap';
import { auto } from '@popperjs/core';
import Standings from './Standings';

const League = () => {
    // obter o id pela URL
    const { leagueID } = useParams();
    const [leagueData, setLeagueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState('classificacoes');

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

    const handleButtonState = (button) => {
        setSelected(button);
    };

    const isActiveButton = (button) => {
        return button === selected ? "active" : "";
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    const currentSeason = leagueData[0].seasons.find(season => season.current);

    return (
        <Container className='container p-5 rounded-4'>
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Image src={leagueData[0].league.logo} width={60} height={auto} alt="Logo da liga" />
                </Col>
                <Col>
                    <h4 className="mb-0">{leagueData[0].league.name}</h4>
                    <h6>{currentSeason ? `${currentSeason.year} / ${currentSeason.year + 1}` : 'Nenhuma época atual encontrada'}</h6>
                </Col>
            </Row>
            <Row>
                <ButtonGroup size='md'>
                    <Button className={isActiveButton('classificacoes')} onClick={() => handleButtonState('classificacoes')}>
                        Classificações
                    </Button>
                    <Button className={isActiveButton('resultados')} onClick={() => handleButtonState('resultados')}>
                        Resultados
                    </Button>
                    <Button className={isActiveButton('lista')} onClick={() => handleButtonState('lista')}>
                        Lista
                    </Button>
                    <Button className={isActiveButton('marcadores')} onClick={() => handleButtonState('marcadores')}>
                        Marcadores
                    </Button>
                    <Button className={isActiveButton('arquivo')} onClick={() => handleButtonState('arquivo')}>
                        Arquivo
                    </Button>
                </ButtonGroup> 
                <hr />
            </Row>
            <Row>
                <Standings season={currentSeason.year} leagueID={leagueID} />
            </Row>
        </Container>
    );
};

export default League;
