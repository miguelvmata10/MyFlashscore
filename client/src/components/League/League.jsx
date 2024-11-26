import React, { useEffect, useState } from 'react';
import './League.css';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Image, Row, Col } from 'react-bootstrap';
import Standings from './Standings';
import Statistics from './Statistics';
import Results from './Results';
import ListOfGames from './ListOfGames';

const League = () => {
    const { leagueID } = useParams();
    const [leagueData, setLeagueData] = useState(null);
    const [availableSeasons, setAvailableSeasons] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [loading, setLoading] = useState(true);
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('classificacoes');

    const fetchLeagueData = async () => {
        try {
            const response = await api.get(`/competitions/leagues/${leagueID}`);
            setLeagueData(response.data.response);

            const seasons = response.data.response[0]?.seasons.map((season) => season.year);
            setAvailableSeasons(seasons);

            // Definir a temporada atual
            const currentSeason = response.data.response[0]?.seasons.find((season) => season.current);
            if (currentSeason) {
                setSelectedSeason(currentSeason.year);
            }
        } catch (error) {
            console.error('Erro ao obter os dados da liga: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeagueData();
    }, [leagueID]);

    const renderComponent = () => {
        switch (selected) {
            case 'classificacoes':
                return <Standings season={selectedSeason} leagueID={leagueID} />;
            case 'resultados':
                return <Results />;
            case 'lista':
                return <ListOfGames />;
            case 'marcadores':
                return <Statistics season={selectedSeason} leagueID={leagueID} />;
            default:
                return <div>Erro</div>;
        }
    };

    const handleDropdownSelect = (eventKey) => {
        setSelectedSeason(eventKey);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Image src={leagueData[0]?.league?.logo} width={60} alt="Logo da liga" />
                </Col>
                <Col>
                    <h4 className="mb-2">{leagueData[0]?.league?.name}</h4>
                    <Dropdown onSelect={handleDropdownSelect} size="sm">
                        <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                            {selectedSeason ? `${selectedSeason} / ${parseInt(selectedSeason) + 1}` : 'Selecionar temporada'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {availableSeasons?.map((season) => (    
                                <Dropdown.Item eventKey={season}>{`${season} / ${season + 1}`}</Dropdown.Item> 
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <ButtonGroup size="md">
                    <Button
                        className={isActiveButton('classificacoes')}
                        onClick={() => handleButtonState('classificacoes')}
                    >
                        Classificações
                    </Button>
                    <Button
                        className={isActiveButton('resultados')}
                        onClick={() => handleButtonState('resultados')}
                    >
                        Resultados
                    </Button>
                    <Button className={isActiveButton('lista')} onClick={() => handleButtonState('lista')}>
                        Lista
                    </Button>
                    <Button
                        className={isActiveButton('marcadores')}
                        onClick={() => handleButtonState('marcadores')}
                    >
                        Marcadores
                    </Button>
                </ButtonGroup>
                <hr />
            </Row>
            <Row>{renderComponent()}</Row>
        </Container>
    );
};

export default League;
