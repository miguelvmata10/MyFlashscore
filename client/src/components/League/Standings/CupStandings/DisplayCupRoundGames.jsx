import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useApiRequest from '../../../../hooks/api/useApiRequest';
import { fetchRoundGames } from '../../../../services/GameService';
import LoadingScreen from '../../../CommonUI/LoadingScreen';
import NotFound from '../../../CommonUI/NotFound';
import GameCard from '../../../Game/GameCard/GameCard';
import ErrorBanner from '../../../CommonUI/ErrorBanner';

const DisplayCupRoundGames = ({ round, season }) => {
    const { leagueID } = useParams();
    const { data: roundGames, loading, error, fetchData } = useApiRequest(fetchRoundGames);

    useEffect(() => {
        if (leagueID && season && round) {
            fetchData(leagueID, season, round);  
        }
    }, [leagueID, season, round, fetchData]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorBanner errorMessage={error.message} />;
    if (!roundGames || roundGames.length === 0 ) return <NotFound />;

    return (
        <Row>
            {roundGames.map((game, index) => (
                <GameCard GameData={game} key={index}/>
            ))}
        </Row>
    );
}

export default DisplayCupRoundGames;