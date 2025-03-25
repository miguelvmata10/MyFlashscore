import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApiRequest from '../../../hooks/useApiRequest';
import { fetchLeagueStanding } from '../../../services/CompetitionService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import NotFound from '../../CommonUI/NotFound';
import LeagueStandings from './LeagueStandings/LeagueStandings';
import CupStandings from './CupStandings/CupStandings';
import '../LeagueStyles.css';

const Standings = ({ season, type, hasStandings }) => {
    const { leagueID } = useParams();
    const { data: teams, loading, error, fetchData } = useApiRequest(fetchLeagueStanding);

    useEffect(() => {
        if (leagueID && season && hasStandings) {
            fetchData(leagueID, season);  
        }
    }, [leagueID, season, fetchData, hasStandings]);

    // necessário fazer esta lógica aqui pois pode não haver standings para uma competição, mas ainda ser válido
    // por exemplo, taças não têm standings, mas têm rondas, por isso é necessário colocar esta lógica antes da verificação 
    // do valor de 'teams' para não renderizar o componente <NotFound /> e se necessário apenas dentro do componente <LeagueStandings />
    // nos casos onde o array não tem dados para standings, apesar de hasStandings ser verdadeiro 
    if (!hasStandings) {
        return (
            type === 'League' ? <LeagueStandings teams={[]} hasStandings={hasStandings} type={ type }/> : 
            type === 'Cup' ? <CupStandings teams={[]} hasStandings={hasStandings} type={ type } season={ season }/> : 
            <div>
                Erro inesperado nas classificações da competição.
            </div>
        );
    }

    // esta parte só será executada se a competição tiver classificações disponíveis
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!teams || teams.length === 0 ) return <NotFound />;

    // garantir que há standings
    const standings = teams[0]?.league?.standings || [];

    const groupedStandings = standings.map(( group ) => {
        // como a API não fornece o nome de cada grupo, fui buscar o nome de cada grupo dentro 
        // da primeira equipa de cada grupo
        const groupName = group[0]?.group || 'N/A';

        const teams = group.map((team) => {
            const teamData = team?.all;
            const teamName = team?.team?.name || 'N/A';
            const teamStandingDescription = team?.description;
            const groupName = team?.group;
            const teamID = team?.team?.id || 'N/A';
            const teamLogo = team?.team?.logo || ''; 
            const rank = team?.rank || 'N/A';
            const gamesPlayed = teamData?.played ?? 'N/A';
            const gamesWon = teamData?.win ?? 'N/A';
            const gamesDrawn = teamData?.draw ?? 'N/A';
            const gamesLost = teamData?.lose ?? 'N/A';
            const goalsFor = teamData?.goals?.for ?? 0;
            const goalsAgainst = teamData?.goals?.against ?? 0;
            const goalDifference = goalsFor - goalsAgainst;
            const points = team?.points ?? 'N/A';
            const form = team?.form || 'N/A';

            return {
                teamName,
                teamStandingDescription,
                groupName,
                teamID,
                teamLogo,
                rank,
                gamesPlayed,
                gamesWon,
                gamesDrawn,
                gamesLost,
                goalsFor,
                goalsAgainst,
                goalDifference,
                points,
                form
            }
        })

        return {
            groupName,
            teams
        }
    });

    return (
        type === 'League' ? <LeagueStandings teams={groupedStandings} hasStandings={hasStandings} type={ type } /> : 
        type === 'Cup' ? <CupStandings teams={groupedStandings} hasStandings={hasStandings} type={ type } season={ season } /> : 
        <div>
            Erro inesperado nas classificações da competição.
        </div>
    );
};

export default Standings;
