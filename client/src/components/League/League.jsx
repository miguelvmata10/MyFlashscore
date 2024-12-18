import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Image, Row, Col } from 'react-bootstrap';
import Standings from './Standings';
import Statistics from './Statistics';
import Results from './Results';
import ListOfGames from './ListOfGames';

import useApiRequest from '../../hooks/useApiRequest';
import { fetchLeagueData } from '../../services/CompetitionService';

const League = () => {
    const { leagueID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('classificacoes');

    const { data: leagueData, loading, error, fetchData } = useApiRequest(fetchLeagueData);

    useEffect(() => {
        if (leagueID) {
            fetchData(leagueID);
        }
    }, [leagueID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!leagueData) return <p>Nenhum dado disponível.</p>;

    const renderComponent = () => {
        switch (selected) {
            case 'classificacoes':
                return <Standings season={currentSeason.year} leagueID={leagueID} />;
            case 'resultados':
                return <Results />;
            case 'lista':
                return <ListOfGames />;
            case 'marcadores':
                return <Statistics season={currentSeason.year} leagueID={leagueID} />;
            default:
                return <div>Erro</div>;
        }
    };

    // armazena o ano da temporada atual em current season
    const currentSeason = leagueData[0].seasons.find(season => season.current);

    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Image src={leagueData[0]?.league?.logo} width={60} alt="Logo da liga" />
                </Col>
                <Col>
                    <h4 className="mb-2">{leagueData[0]?.league?.name}</h4>
                    <h6>{currentSeason ? `${currentSeason.year} / ${currentSeason.year + 1}` : 'Nenhuma época atual encontrada'}</h6>
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
                    <Button 
                        className={isActiveButton('lista')}
                        onClick={() => handleButtonState('lista')}
                    >
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
