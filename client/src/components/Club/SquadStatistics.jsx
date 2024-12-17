import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchTeamLeagues } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';

const SquadStatistics = () => {
    const { teamID } = useParams()
    const { data: leagues, loading, error, fetchData } = useApiRequest(fetchTeamLeagues);
    const [ selectedLeague, setSelectedLeague ] = useState(null);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);    
        }
    }, [teamID, fetchData])

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!leagues) return <p>Nenhum dado disponível.</p>;

    console.log('DADOS DAS LIGAS DA EQUIPA: ', leagues);
    console.log('tamanho da resposta da API: ', leagues.length);

    const handleDropdownSelect = (eventKey) => {
        setSelectedLeague(eventKey);
    }
    
    return (
        <Dropdown onSelect={handleDropdownSelect}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {selectedLeague}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey='Taça da liga'>Taça da liga</Dropdown.Item>
                <Dropdown.Item eventKey='Taça'>Taça</Dropdown.Item>
                <Dropdown.Item eventKey='Champions'>Champions</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
  )
}
export default SquadStatistics