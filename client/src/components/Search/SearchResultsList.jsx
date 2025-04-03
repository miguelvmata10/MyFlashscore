import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ElementCard from '../CommonUI/ElementCard';

const SearchResultsList = ({data, name}) => {
    const renderData = () => {
        if (
            (name === 'Jogador' && (!data.jogador || data.jogador.length === 0)) ||
            (name === 'Treinador' && (!data.treinador || data.treinador.length === 0)) ||
            (name === 'Clube' && (!data.clube || data.clube.length === 0)) ||
            (name === 'Competicao' && (!data.competicao || data.competicao.length === 0))
        ) {
            return <p>Nenhum dado disponível.</p>;
        }

        switch (name) {
            case 'Jogador':
                return (
                    <Row className='g-3'>
                        {data.jogador.map((player) => (
                            <Col key={player.player.id} md={4}>
                                <ElementCard 
                                    role='player'
                                    id={player.player.id}
                                    photo={player.player.photo}
                                    name={player.player.name}
                                    number={player.player.number}
                                    age={player.player.age}
                                    key={player.player.id}
                                />
                            </Col>
                        ))}
                    </Row>
                );
            case 'Treinador':
                return (
                    <Row className='g-3'>
                        {data.treinador.map((coach) => (
                            <Col key={coach.id} md={4}>
                                <ElementCard 
                                    role='coach'
                                    id={coach.id}
                                    photo={coach.photo}
                                    name={coach.name}
                                    key={coach.id}
                                />
                            </Col>
                        ))}
                    </Row>
                );
            case 'Clube':
                return (
                    <Row className='g-3'>
                        {data.clube.map((team) => (
                            <Col key={team.team.id} md={4}>
                                <ElementCard 
                                    role='team'
                                    id={team.team.id}
                                    photo={team.team.logo}
                                    name={team.team.name}
                                    key={team.team.id}
                                />
                            </Col>
                        ))}
                    </Row>
                );
            case 'Competicao':
                return (
                    <Row className='g-3'>
                        {data.competicao.map((league) => (
                            <Col key={league.league.id} md={4}>
                                <ElementCard 
                                    role='league'
                                    id={league.league.id}
                                    photo={league.league.logo}
                                    name={league.league.name}
                                    key={league.league.id}
                                />
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
            <h4 className='mb-4 heading-border'>Resultados</h4>
            {renderData()}
        </div>
    )
}
export default SearchResultsList