import React, { useEffect, useMemo, useState } from 'react';
import { Image, Row, Col, Button, ButtonGroup, Container } from 'react-bootstrap';
import LoadingScreen from '../CommonUI/LoadingScreen';
import MatchList from './MatchList';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchGamesPerDay } from '../../services/GameService';
import './MatchList.css';

const LeagueMatchSelector = ({date, topLeaguesIDs}) => {
    const [ topLeagueGames, setTopLeagueGames] = useState([]);
    const { data: games, loading, error, fetchData } = useApiRequest(fetchGamesPerDay);

    useEffect(() => {
        if (date) {
            fetchData(date);  
        }
    }, [date, fetchData]);

    const gamesByLeague = useMemo(() => {
        if (!games) return {};

        // Filtra apenas os jogos das ligas prioritárias
        const priorityGames = games.filter((game) => topLeaguesIDs.includes(game.league?.id));

        const organizeGameLeaguesByID = (gamesArray) => {
            return gamesArray.reduce((acc, game) => {
                const league = game.league;
                const leagueId = league.id;
    
                // Verifica se a chave já existe no acumulador 
                if (!acc[leagueId]) {
                    acc[leagueId] = {
                        id: leagueId,
                        flag: league.flag,
                        name: league.name,  
                        games: []  
                    };
                }
    
                // Adiciona o jogo ao array da liga correspondente
                acc[leagueId].games.push(game);
                return acc;
            }, {});
        };

        return organizeGameLeaguesByID(priorityGames);

    }, [games, topLeaguesIDs]);

    useEffect(() => {
        setTopLeagueGames(Object.values(gamesByLeague));
    }, [gamesByLeague, games]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!games) return <p>Nenhum dado disponível.</p>;
    
    return (
        <Container className=''>
            {topLeagueGames.length > 0 && (
                <>
                    <h5 className='border-start border-danger border-4 ps-2 py-1 bg-transparent bg-opacity-50 rounded-start'>
                        Principais ligas
                    </h5>
                    <MatchList leagueGames={topLeagueGames} type='topLeagues'/>
                </>
            )}

            {/* {otherLeagueGames.length > 0 && (
                <>
                    <h5>Outras ligas</h5>
                    <MatchList leagueGames={otherLeagueGames} type='otherLeagues'/>
                </>
            )} */}
        </Container>
    )
}
export default LeagueMatchSelector