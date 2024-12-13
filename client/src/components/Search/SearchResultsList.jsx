import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SearchCard from './SearchCard';
import { Link } from "react-router-dom";

const SearchResultsList = ({data, name}) => {
    const renderData = () => {
        if (
            (name === 'Jogador' && (!data.jogador || data.jogador.length === 0)) ||
            (name === 'Treinador' && (!data.treinador || data.treinador.length === 0)) ||
            (name === 'Clube' && (!data.clube || data.clube.length === 0)) ||
            (name === 'Competicao' && (!data.competicao || data.competicao.length === 0))
        ) {
            console.log('Nenhum dado disponível:', data);
            return <p>Nenhum dado disponível.</p>;
        }

        switch (name) {
            case 'Jogador':
                return (
                    <Row className='g-3'>
                        {data.jogador.map((player) => (
                            <Col key={player.player.id} md={4}>
                                <Link to={`/player/${player.player.id}`} className='customCardLink'>
                                    <SearchCard 
                                        id={player.player.id} 
                                        photo={player.player.photo} 
                                        name={player.player.name}  
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                );
            case 'Treinador':
                return (
                    <Row className='g-3'>
                        {data.treinador.map((coach) => (
                            <Col key={coach.id} md={4}>
                                <Link to={`/coach/${coach.id}`} className='customCardLink'>
                                    <SearchCard 
                                        id={coach.id} 
                                        photo={coach.photo} 
                                        name={coach.name}  
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                );
            case 'Clube':
                return (
                    <Row className='g-3'>
                        {data.clube.map((team) => (
                            <Col key={team.team.id} md={4}>
                                <Link to={`/team/${team.team.id}`} className='customCardLink'>
                                    <SearchCard 
                                        id={team.team.id} 
                                        photo={team.team.logo} 
                                        name={team.team.name}  
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                );
            case 'Competicao':
                return (
                    <Row className='g-3'>
                        {data.competicao.map((league) => (
                            <Col key={league.league.id} md={4}>
                                <Link to={`/league/${league.league.id}`} className='customCardLink'>
                                    <SearchCard 
                                        id={league.league.id} 
                                        photo={league.league.logo} 
                                        name={league.league.name}  
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h4 className='mb-4'>Resultados</h4>
            {renderData()}
        </div>
    )
}
export default SearchResultsList