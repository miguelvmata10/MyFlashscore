import React from 'react';
import { ButtonGroup, Row, Button } from 'react-bootstrap';
import useButtonGroup from '../../../../hooks/ui/useButtonGroup';
import StandingsTable from '../StandingsTable/StandingsTable';
import CupRoundGamesSelector from './CupRoundGamesSelector';
import NotFound from '../../../CommonUI/NotFound';

const DisplayCupStandings = ({ teams, hasStandings, type, leagueRounds, season, teamID = null}) => {
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('standings');

    const competitionToggle = () => {
        switch (selected) {
            case 'standings':
                return <StandingsTable groups={ teams } hasStandings={ hasStandings } type={ type } teamID={teamID}/>;
            case 'rounds':
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
                            className={isActiveButton('standings')}
                            onClick={() => handleButtonState('standings')}
                        >
                            Standings
                        </Button>
                        <Button
                            className={isActiveButton('rounds')}
                            onClick={() => handleButtonState('rounds')}
                        >
                            Rounds
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
        return <StandingsTable groups={ teams } hasStandings={ hasStandings } type={ type } teamID={teamID}/>;
    }

    // não tem standings, mas tem rondas
    if (!hasStandings && leagueRounds && leagueRounds.length > 0) {
        return <CupRoundGamesSelector leagueRounds={leagueRounds} season={season} />
    }

    // não tem nada
    return <NotFound />;
};

export default DisplayCupStandings;