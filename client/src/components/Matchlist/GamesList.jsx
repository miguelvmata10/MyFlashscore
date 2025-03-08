import React, { useEffect, useMemo, useState } from 'react';
import { Image, Row, Col, Button, ButtonGroup, Container } from 'react-bootstrap';
import LoadingScreen from '../CommonUI/LoadingScreen';

import useApiRequest from '../../hooks/useApiRequest';
import { fetchGamesPerDay } from '../../services/GameService';

const GamesList = ({date, topLeaguesIDs}) => {
    const [ topLeagueGames, setTopLeagueGames] = useState([]);
    const [ otherLeagueGames, setOtherLeagueGames] = useState([]);
    const { data: games, loading, error, fetchData } = useApiRequest(fetchGamesPerDay);

    useEffect(() => {
        if (date) {
            fetchData(date);  
        }
    }, [date, fetchData]);

    const gamesByLeague = useMemo(() => {
        if (!games) return {};

        const prioritizeGames = games.reduce((acc, game) => {
            const league = game.league;
            const leagueId = league ? league.id : 'outros';

            const isPriority = topLeaguesIDs.includes(leagueId);

            if (!acc[isPriority ? 'priority' : 'other']) {
                acc[isPriority ? 'priority' : 'other'] = [];
            }

            acc[isPriority ? 'priority' : 'other'].push(game);

            return acc;
        }, {priority: [], other: []});

        const organizeGameLeaguesByID = (gamesArray) => {
            return gamesArray.reduce((acc, game) => {
                // Verifica se a liga existe e usa o ID como chave, se não, usa "Outras ligas"
                const league = game.league;
                const leagueId = league ? league.id : 'outros';
        
                // Verifica se a chave já existe no acumulador 
                if (!acc[leagueId]) {
                    acc[leagueId] = {
                        id: leagueId,
                        name: league ? league.name : "Outras ligas",  
                        games: []  
                    };
                }
        
                // Adiciona o jogo ao array da liga correspondente
                acc[leagueId].games.push(game);
                return acc;
            }, {});
        }

        const prioritizedLeagueGames = organizeGameLeaguesByID(prioritizeGames.priority);
        const otherLeagueGames = organizeGameLeaguesByID(prioritizeGames.other);

        return {prioritizedLeagueGames, otherLeagueGames};

    }, [games, topLeaguesIDs]);

    useEffect(() => {
        setTopLeagueGames(gamesByLeague.prioritizedLeagueGames);
        setOtherLeagueGames(gamesByLeague.otherLeagueGames);
    }, [gamesByLeague]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!games) return <p>Nenhum dado disponível.</p>;

    console.log('TOP: ', topLeagueGames);
    console.log('OTHER: ', otherLeagueGames);
    
    return (
        <div>GamesList</div>
    )
}
export default GamesList