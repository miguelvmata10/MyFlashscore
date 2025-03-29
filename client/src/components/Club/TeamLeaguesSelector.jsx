import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Container } from 'react-bootstrap';
import { fetchTeamLeagues } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';
import SquadStatistics from './SquadStatistics/SquadStatistics';
import TeamMatchlist from './TeamMatchlist';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';

const TeamLeaguesSelector = ({componentToRender}) => {
    const { teamID } = useParams()
    const { data: leagues, loading, error, fetchData } = useApiRequest(fetchTeamLeagues);
    const [ selectedLeague, setSelectedLeague ] = useState(null);
    const [ selectedLeagueLogo, setSelectedLeagueLogo ] = useState(null);
    const [ selectedLeagueID, setSelectedLeagueID ] = useState(null);
    const [ selectedLeagueSeason, setSelectedLeagueSeason ] = useState(null);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);    
        }
    }, [teamID, fetchData])

    // Função para filtrar as ligas em que a equipa está inserida na época atual
    const retrieveCurrentTeamLeagues = (leagues) => {
        const filteredLeagues = [];

        if (leagues && Array.isArray(leagues)) { 
            leagues.forEach(({ league, seasons }) => {
                if (seasons && Array.isArray(seasons)) {
                    seasons.forEach(({ current, year }) => {
                        if (current) {
                            filteredLeagues.push({
                                id: league.id,
                                name: league.name,
                                logo: league.logo,
                                season: year,
                            });
                        }
                    });
                }
            });
        }
        return filteredLeagues;
    };
    
    const currentTeamLeagues = retrieveCurrentTeamLeagues(leagues);

    // Inicializa o selectedLeague com o nome da primeira liga, se disponível
    useEffect(() => {
        if (currentTeamLeagues.length > 0 && selectedLeague === null) {
            setSelectedLeague(currentTeamLeagues[0].name);
            setSelectedLeagueLogo(currentTeamLeagues[0].logo)
            setSelectedLeagueID(currentTeamLeagues[0].id);
            setSelectedLeagueSeason(currentTeamLeagues[0].season);
        }
    }, [currentTeamLeagues, selectedLeague]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!leagues || leagues.length === 0 ) return <NotFound />;

    const handleDropdownSelect = (eventKey) => {
        // para poder atualizar os dados a serem passados para apresentar as estatisticas no componente 'SquadStatistics'
        const selectedLeague = currentTeamLeagues.find(league => league.name === eventKey);
        if (selectedLeague) {
            setSelectedLeagueID(selectedLeague.id);
            setSelectedLeagueSeason(selectedLeague.season);
            setSelectedLeagueLogo(selectedLeague.logo);
            setSelectedLeague(selectedLeague.name);
        }
    }

    return (
        <Container>
            <Row>
                <Dropdown onSelect={handleDropdownSelect}>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        {selectedLeague ? (
                            <>
                                <FallbackImage type='league' className="imageResize me-2" src={selectedLeagueLogo} />
                                {selectedLeague}
                            </>
                        ) : (
                            "Selecione uma liga"
                        )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-white">
                        {currentTeamLeagues.map((league) => (
                            <Dropdown.Item key={league.id} eventKey={league.name} className="bg-dark text-white">
                                <FallbackImage className="imageResize me-2" type='league' src={league.logo} /> {league.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                {componentToRender === 'SquadStatistics' ? (
                    <SquadStatistics leagueID={selectedLeagueID} season={selectedLeagueSeason} />
                ) : componentToRender === 'SquadResults' ? (
                    <TeamMatchlist leagueID={selectedLeagueID} season={selectedLeagueSeason} />
                ) : null }       
            </Row>
        </Container>
  )
}

export default TeamLeaguesSelector