import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { ButtonGroup, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useApiRequest from '../../hooks/useApiRequest';
import { fetchAllLeagues } from '../../services/CompetitionService';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';

const Sidebar = ({topLeaguesIDs}) => {
    const [ leagues, setLeagues ] = useState([]);
    const { data: leagueData, loading, error, fetchData } = useApiRequest(fetchAllLeagues);

    // Função para filtrar as principais ligas da lista global de ligas
    const filterTopLeagues = (allLeagues, topLeaguesIDs) => {
        return allLeagues.filter(l => topLeaguesIDs.includes(l.league.id));
    }

    useEffect(() => {
        fetchData();  
    }, []);

    useEffect(() => {
        if (leagueData) {
            setLeagues(filterTopLeagues(leagueData, topLeaguesIDs));
        }
    }, [leagueData]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!leagueData || leagueData.length === 0 ) return <NotFound />;

    return (
        <Container className='sidebarContainer p-3 rounded-4 mb-2'>
            <div className='text-center mb-3'>
                <h4><b>Principais ligas</b></h4>
            </div>
            <ButtonGroup vertical>
                {leagues.map((topLeague) => (
                    <Button className='d-flex mb-2' as={Link} to={`/league/${topLeague.league.id}`} key={topLeague.league.id}>
                        <Image className='imageResize' src={topLeague.league.logo} />
                        <span className='ms-2'>{topLeague.league.name}</span>
                    </Button>
                ))}
            </ButtonGroup>
        </Container>
    );
};

export default Sidebar;
