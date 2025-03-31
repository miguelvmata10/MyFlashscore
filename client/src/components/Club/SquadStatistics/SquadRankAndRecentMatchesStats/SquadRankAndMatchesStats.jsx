import { Row, Col } from 'react-bootstrap';
import LoadingScreen from '../../../CommonUI/LoadingScreen';
import NotFound from '../../../CommonUI/NotFound';
import useTeamResults from '../../../../hooks/useTeamResults';
import SquadStandingsStatistics from './SquadStandingsStatistics';
import LastLeagueGames from './LastLeagueGames';

const SquadRankAndMatchesStats = ({leagueID, season}) => {
    const { results, resultsLoading, resultsError } = useTeamResults(leagueID, season);

    if (resultsLoading) return <LoadingScreen />;
    if (resultsError) return <p>Erro: {resultsError.message}</p>;
    if (!results || results.length === 0) return <NotFound />;

    return (
        <Row className='mb-3'>
            <Col>
                <h6 className='text-center'>Team standings</h6>
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