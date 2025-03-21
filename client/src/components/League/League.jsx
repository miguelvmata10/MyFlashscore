import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Row, Col } from 'react-bootstrap';
import Standings from './Standings';
import TopScorersAndAssists from './TopScorersAndAssists';
import LeagueMatches from './LeagueMatches';
import LoadingScreen from '../CommonUI/LoadingScreen';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchLeagueData } from '../../services/CompetitionService';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';

const League = () => {
    const { leagueID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('classificacoes');

    const { data: leagueData, loading, error, fetchData } = useApiRequest(fetchLeagueData);

    useEffect(() => {
        if (leagueID) {
            fetchData(leagueID);
        }
    }, [leagueID, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!leagueData || leagueData.length === 0) return <NotFound />;

    const renderComponent = () => {
        switch (selected) {
            case 'classificacoes':
                return <Standings season={currentSeason.year} />;
            case 'resultados':
                return <LeagueMatches type='pastGames' />;
            case 'lista':
                return <LeagueMatches type='upcomingGames' />;
            case 'marcadores':
                return <TopScorersAndAssists season={currentSeason.year} />;
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
                    <FallbackImage src={leagueData[0]?.league?.logo} type='league' width={60} alt="Logo da liga" />
                </Col>
                <Col>
                    <h4 className="mb-2">{leagueData[0]?.league?.name}</h4>
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup className="w-100">
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
                </div>
                <hr />
            </Row>
            <Row>{renderComponent()}</Row>
        </Container>
    );
};

export default League;
