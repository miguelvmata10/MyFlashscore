import { Image, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Goal from '../../assets/GameImages/Goal.png';
import RedCard from '../../assets/GameImages/Red_card.svg.png';
import YellowCard from '../../assets/GameImages/Yellow_card.svg.png';
import Substitution from '../../assets/GameImages/Substitution_card.png';
import Var from '../../assets/GameImages/VAR.png';
import Goal_PenaltyMissed from '../../assets/GameImages/Goal_Penalty_missed.png';
import { useMemo } from 'react';
import FallbackImage from '../CommonUI/FallbackImage';

// homeTeam é passado via prop apenas para determinar os dados que serão mostrados
// no lado direito e esquerdo do ecrã (esquerda -> equipa da casa, direita -> equipa visitante )
const GameSummary = ({ events, homeTeam }) => {
  
  const getEventImage = (event) => {
    switch (event.type) {
      case 'Goal':
        return event.detail === 'Missed Penalty' ? Goal_PenaltyMissed : Goal;
      case 'Card':
        return event.detail === 'Yellow Card' ? YellowCard : RedCard;
      case 'subst':
        return Substitution;
      case 'Var':
        return Var;
      default:
        return null;
    }
  }

  const getMatchPeriod = (event) => {
    const extraTime = event.time.extra || 0;
    const timeElapsed = event.time.elapsed;

    if (event.comments === "Penalty Shootout" ) {
      return 'Pénaltis';
    }

    if (timeElapsed <= 45 && extraTime === 0 || timeElapsed === 45 && extraTime !== 0 ) {
      return '1ª Parte';
    }

    if (timeElapsed <= 90 && extraTime === 0 && timeElapsed >= 45 || timeElapsed === 90 && extraTime !== 0 ) {
      return '2ª Parte';
    }

    if (timeElapsed <= 120 && extraTime === 0 && timeElapsed >= 90 || timeElapsed === 120 && extraTime !== 0 ) {
      return 'Prolongamento';
    }

    return 'Pós jogo';
  }

  const formatTime = (elapsed, extra) => {
    if (!extra) {
      return `${elapsed}' `;
    }
    return `${elapsed}+${extra}' `
  }

  const eventsByPeriod = useMemo(() => {
    const groupPeriod = {};

    events.forEach(event => {
      const period = getMatchPeriod(event);

      if (!groupPeriod[period]) {
        groupPeriod[period] = [];
      }

      groupPeriod[period].push(event);
    });

    return groupPeriod;
  }, [events])

  const renderEvent = (event, detail) => {
    const eventImage = getEventImage(event);
    const isHomeTeam = detail === homeTeam;

    // ordem da apresentação muda se for a equipa visitada ou visitante
    if (!isHomeTeam) {
      return (
        <div className='text-end gap-2'>
          <Link to={`/player/${event.assist.id}`} className='customLink'>
            <span className='me-1' style={{ color: '#a1a19a' }}>
              {event.assist.name && `(${event.assist.name})`}
            </span>
          </Link>
          <Link to={`/player/${event.player.id}`} className='customLink'>
            {event.player.name} 
          </Link>
          {eventImage && <FallbackImage src={eventImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }}/>}
          {formatTime(event.time.elapsed, event.time.extra)}
        </div>
      );
    }
    return (
      <div className='text-start gap-2'>
        {formatTime(event.time.elapsed, event.time.extra)}
        {eventImage && <FallbackImage src={eventImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }} />}
        <Link to={`/player/${event.player.id}`} className='customLink'>
            {event.player.name} 
        </Link>
        <Link to={`/player/${event.assist.id}`} className='customLink'>
            <span className='ms-1' style={{ color: '#a1a19a' }}>
              {event.assist.name && `(${event.assist.name})`}
            </span>
        </Link>
      </div>
    );
  };

  return (
    <Container>
      {Object.keys(eventsByPeriod).length === 0 ? (
      <div className="text-center p-4 fw-bold rounded-4" style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
        Nenhum evento disponível
      </div>
      ) : (
      Object.entries(eventsByPeriod).map(([period, periodEvents]) => (
        <div key={period}>
          <h6 className="mb-0 fw-bold rounded-3 p-2" style={{ backgroundColor: '#4e4e4b' }}>
            {period}
          </h6>
          <div className="p-3">
            {periodEvents.map((event, index) => (
              <Row key={index} className="mb-3">
                {renderEvent(event, event.team.id)}
              </Row>
            ))}
          </div>
        </div>
      ))
      )}
    </Container>
  );
}

export default GameSummary