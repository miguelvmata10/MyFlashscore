import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useApiRequest from '../../hooks/api/useApiRequest';
import { fetchAllLeagues } from '../../services/CompetitionService';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import FallbackImage from '../CommonUI/FallbackImage';
import ErrorBanner from '../CommonUI/ErrorBanner';

const Sidebar = ({topLeaguesIDs, orientation}) => {
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
    if (error) return <ErrorBanner errorMessage={error.message} />;
    if (!leagueData || leagueData.length === 0 ) return <NotFound />;

    return (
        <div className='sidebarContainer p-3 rounded-4 mb-2'>
            {orientation === 'vertical' ? (
                <>
                    <div className='text-center mb-3'>
                        <h5>Top leagues</h5>
                    </div>
                    <ButtonGroup vertical>
                        {leagues.map((topLeague) => (
                            <Button className='d-flex mb-2' as={Link} to={`/league/${topLeague.league.id}`} key={topLeague.league.id}>
                                <FallbackImage className='imageResize' type='league' src={topLeague.league.logo} />
                                <span className='ms-2'>{topLeague.league.name}</span>
                            </Button>
                        ))}
                    </ButtonGroup>
                </>
            ) : (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="overflow-auto d-flex" style={{ msOverflowStyle: 'none', scrollbarWidth: 'thin' }}>
                        {leagues.map((topLeague) => (
                            <Button 
                                className='mx-1 m-2 flex-shrink-0' 
                                variant="dark"
                                as={Link} 
                                to={`/league/${topLeague.league.id}`} 
                                key={topLeague.league.id}
                            >
                                <FallbackImage 
                                    type='league'
                                    src={topLeague.league.logo}
                                    style={{ width: '35px', height: 'auto', objectFit: 'contain'}} 
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
