import React from 'react';
import { ButtonGroup, Row, Button } from 'react-bootstrap';
import useButtonGroup from '../../../../hooks/useButtonGroup';
import StandingsTable from '../StandingsTable';
import CupRoundGamesSelector from './CupRoundGamesSelector';
import NotFound from '../../../CommonUI/NotFound';

const DisplayCupStandings = ({ teams, hasStandings, type, leagueRounds, season }) => {
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('tabela');

    const competitionToggle = () => {
        switch (selected) {
            case 'tabela':
                return <StandingsTable groups={ teams } hasStandings={ hasStandings } type={ type } />;
            case 'rondas':
                return <CupRoundGamesSelector leagueRounds={leagueRounds} season={season} />
            default:
                return <div>Erro</div>;
        }
    }

    // há standings e rondas
    if (hasStandings && leagueRounds && leagueRounds.length > 0) {
        // aqui faz a lógica dos dois botões superiores
        return (
            <>
                <div className='mb-2' >
                    <ButtonGroup className='secondary-custom-button w-50' size="sm">
                        <Button
                            className={isActiveButton('tabela')}
                            onClick={() => handleButtonState('tabela')}
                        >
                            Tabela
                        </Button>
                        <Button
                            className={isActiveButton('rondas')}
                            onClick={() => handleButtonState('rondas')}
                        >
                            Rondas
                        </Button>
                    </ButtonGroup>
                </div>
                <Row>
                    {competitionToggle()}
                </Row>
            </>
        );
    }
    
    // apenas tem standings -> dificilmente acontecerá 
    if (hasStandings && (!leagueRounds || leagueRounds.length === 0)) {
        return <StandingsTable groups={ teams } hasStandings={ hasStandings } type={ type } />;
    }

    // não tem standings, mas tem rondas
    if (!hasStandings && leagueRounds && leagueRounds.length > 0) {
        return <CupRoundGamesSelector leagueRounds={leagueRounds} season={season} />
    }

    // não tem nada
    return <NotFound />;
};

export default DisplayCupStandings;