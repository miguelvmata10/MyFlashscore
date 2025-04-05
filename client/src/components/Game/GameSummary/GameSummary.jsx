import { Container } from 'react-bootstrap';
import { useMemo } from 'react';
import NotFound from '../../CommonUI/NotFound';
import GamePeriod from './GamePeriod';

// homeTeam é passado via prop apenas para determinar os dados que serão mostrados
// no lado direito e esquerdo do ecrã (esquerda -> equipa da casa, direita -> equipa visitante )
const GameSummary = ({ events, homeTeam }) => {

  const getMatchPeriod = (event) => {
    const extraTime = event.time.extra || 0;
    const timeElapsed = event.time.elapsed;

    if (event.comments === "Penalty Shootout") return 'Pénaltis';
    if (timeElapsed <= 45 || (timeElapsed === 45 && extraTime > 0)) return '1st Half';
    if (timeElapsed <= 90 || (timeElapsed === 90 && extraTime > 0)) return '2nd Half';
    if (timeElapsed <= 105 || (timeElapsed === 105 && extraTime > 0)) return 'Extra time - 1st Half';
    if (timeElapsed <= 120 || (timeElapsed === 120 && extraTime > 0)) return 'Extra time - 2nd Half';

    return 'Post game';
  };

  const eventsByPeriod = useMemo(() => {
    const groupPeriod = {};

    events.forEach(event => {
      const period = getMatchPeriod(event);

      if (!groupPeriod[period]) {
        groupPeriod[period] = [];
      }

      groupPeriod[period].push(event);
    });

    // Ordena os eventos dentro de cada período pelo tempo (elapsed + extra)
    // para me certificar de que os eventos são mostrados na ordem correta
    Object.keys(groupPeriod).forEach(period => {
      groupPeriod[period].sort((a, b) => {
        const timeA = a.time.elapsed + (a.time.extra || 0);
        const timeB = b.time.elapsed + (b.time.extra || 0);
        return timeA - timeB;
      });
    });

    return groupPeriod;
  }, [events])

  return (
    <Container>
      {Object.keys(eventsByPeriod).length === 0 ? (
        <NotFound />
      ) : (
        Object.entries(eventsByPeriod).map(([period, periodEvents]) => (
          <GamePeriod key={period} period={period} events={periodEvents} homeTeam={homeTeam} />
        ))
      )}
    </Container>
  );
}

export default GameSummary