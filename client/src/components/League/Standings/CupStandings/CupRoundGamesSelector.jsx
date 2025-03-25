import React, { useEffect, useRef } from 'react';
import { ButtonGroup, Row, Button } from 'react-bootstrap';
import useButtonGroup from '../../../../hooks/useButtonGroup';
import DisplayCupRoundGames from './DisplayCupRoundGames';

const CupRoundGamesSelector = ( { leagueRounds, season }) => {
    // guarda o indice da ultima ronda -> ou seja, a atual que será a ronda default
    const currentRoundLength = leagueRounds.length - 1;
    const { selected, handleButtonState, isActiveButton } = useButtonGroup(leagueRounds[currentRoundLength]);
    const scrollContainerRef = useRef(null);
    
    useEffect(() => {
        // Scroll para a direita quando o componente se iniciar, porque a 
        // default round é sempre a última
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    const renderCupRoundGames = () => {
        const foundRound = leagueRounds.find(round => round === selected);
        return foundRound ? <DisplayCupRoundGames season={season} round={foundRound} /> : <div>Erro</div>;
    };
 
    return (
        <div>
            <Row>
                <div className="overflow-auto mb-3" ref={scrollContainerRef}>
                    <ButtonGroup className='mb-1 round-button w-100' size="sm">
                        {leagueRounds.map(( round, index ) => (
                            <Button
                                className={`${isActiveButton(round)} text-nowrap rounded-2`}
                                onClick={() => handleButtonState(round)}
                                key={ index }
                            >
                                { round }
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </Row>
            <Row>
                {renderCupRoundGames()}
            </Row>
        </div>
    );
}

export default CupRoundGamesSelector;