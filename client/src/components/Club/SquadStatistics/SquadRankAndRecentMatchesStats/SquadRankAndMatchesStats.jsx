import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoadingScreen from '../../../CommonUI/LoadingScreen';
import NotFound from '../../../CommonUI/NotFound';
import { useTeamResults } from '../../../../hooks/useTeamResults';
import SquadStandingsStatistics from './SquadStandingsStatistics';
import LastLeagueGames from './LastLeagueGames';
import { Info } from 'lucide-react';

const SquadRankAndMatchesStats = ({leagueID, season}) => {
    const { results, resultsLoading, resultsError } = useTeamResults(leagueID, season);

    if (resultsLoading) return <LoadingScreen />;
    if (resultsError) return <p>Erro: {resultsError.message}</p>;
    if (!results || results.length === 0) return <NotFound />;

    return (
        <Row className='mb-3'>
            <Col>
                <div className='d-flex justify-content-center'>
                    <h6>Team standings 
                        <OverlayTrigger placement="top" overlay={<Tooltip>Only available for leagues</Tooltip>}>
                            <Info size={14} className="text-secondary ms-1" />
                        </OverlayTrigger>
                    </h6>
                </div>
                <SquadStandingsStatistics leagueID={leagueID} results={results} />
            </Col>
            <Col>
                <h6 className='text-center'>Last Games</h6>
                <LastLeagueGames results={results}/>
            </Col>
        </Row>
    )
}
export default SquadRankAndMatchesStats