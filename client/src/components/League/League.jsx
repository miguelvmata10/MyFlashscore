import useButtonGroup from '../../hooks/ui/useButtonGroup';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, ButtonGroup, Button } from 'react-bootstrap';
import Standings from './Standings/Standings';
import TopScorersAndAssists from './TopScorersAndAssists';
import LeagueMatches from './LeagueMatches';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import useLeagueData from '../../hooks/api/useLeagueData';
import ErrorBanner from '../CommonUI/ErrorBanner';

const League = () => {
    const { leagueID } = useParams();
    const { leagueData, leagueDataLoading, leagueDataError } = useLeagueData(leagueID);
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('standings');

    if (leagueDataLoading) return <LoadingScreen />;
    if (leagueDataError) return <ErrorBanner errorMessage={error.message} />;
    if (!leagueData || leagueData.length === 0) return <NotFound />;

    // armazena o ano da temporada atual em current season
    const currentSeason = leagueData[0]?.seasons.find(season => season.current);
    // booleano que verifica se a liga tem classificação
    const hasStandings = currentSeason?.coverage?.standings;
    // a liga pode ser 'League' ou 'Cup'
    const leagueType = leagueData[0]?.league?.type;

    const renderComponent = () => {
        switch (selected) {
            case 'standings':
                // há ligas que são 'Cup', mas mesmo assim têm classificação
                // p.ex -> Champions League é 'Cup' mas tem fase de liga 
                return <Standings season={currentSeason.year} type={leagueType} hasStandings={hasStandings} leagueID={leagueID} />;
            case 'rounds':
                // é ativado apenas quando type === 'Cup' e hasStandings === 'false' 
                return <Standings season={currentSeason.year} type={leagueType} hasStandings={hasStandings} leagueID={leagueID} />;
            case 'results':
                return <LeagueMatches type='pastGames' />;
            case 'list':
                return <LeagueMatches type='upcomingGames' />;
            case 'scorers':
                return <TopScorersAndAssists season={currentSeason.year} />;
            default:
                return <div>Erro</div>;
        }
    };

    return (
        <Container>
            <Row className="align-items-center mb-3">
                {leagueData[0].league.logo && <Col xs="auto">
                    <FallbackImage src={leagueData[0]?.league?.logo} type='league' 
                        style={{width: '70px', height: '70px', objectFit: 'contain'}} 
                    />
                </Col>}
                <Col>
                    <h4 className="mb-2">{leagueData[0]?.league?.name}</h4>
                </Col>
            </Row>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup className="w-100">
                        {hasStandings === false && leagueType === 'Cup' ? (
                            <Button
                                className={isActiveButton('rounds')}
                                onClick={() => handleButtonState('rounds')}
                            >
                                Rounds
                            </Button>) : (
                            <Button
                                className={isActiveButton('standings')}
                                onClick={() => handleButtonState('standings')}
                            >
                                Standings
                            </Button>)
                        }
                        <Button
                            className={isActiveButton('results')}
                            onClick={() => handleButtonState('results')}
                        >
                            Results
                        </Button>
                        <Button 
                            className={isActiveButton('list')}
                            onClick={() => handleButtonState('list')}
                        >
                            List
                        </Button>
                        <Button
                            className={isActiveButton('scorers')}
                            onClick={() => handleButtonState('scorers')}
                        >
                            Scorers
                        </Button>
                    </ButtonGroup>
                </div>
                <hr />
            </Row>
            <Row>
                {renderComponent()}
            </Row>
        </Container>
    );
};

export default League;
