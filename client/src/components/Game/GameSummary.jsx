import { Image, Row, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Goal from '../../assets/GameImages/Goal.png';
import RedCard from '../../assets/GameImages/Red_card.svg.png';
import YellowCard from '../../assets/GameImages/Yellow_card.svg.png';
import Substitution from '../../assets/GameImages/Substitution_card.png';
import Var from '../../assets/GameImages/VAR.png';
import Goal_PenaltyMissed from '../../assets/GameImages/Goal_Penalty_missed.png';

// homeTeam é passado via prop apenas para determinar os dados que serão mostrados
// no lado direito e esquerdo do ecrã
const GameSummary = ({ events, homeTeam }) => {
  console.log("dados do jogo sdsd: ", events);

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

  const getMatchPeriod = () => {
  
  }

  const renderEvent = (event, detail) => {
    const eventImage = getEventImage(event);
    const isHomeTeam = detail === homeTeam;

    if (!isHomeTeam) {
      return (
        <div className='text-end gap-2'>
          <Link to={`/player/${event.assist.id}`} className='customLink'>
            <span className='text-secondary me-1'>
              {event.assist.name && `(${event.assist.name})`}
            </span>
          </Link>
          <Link to={`/player/${event.player.id}`} className='customLink'>
            {event.player.name} 
          </Link>
          {eventImage && <Image src={eventImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }}/>}
          { `${event.time.elapsed} '`}
        </div>
      );
    }
    return (
      <div className='text-start gap-2'>
        {`${event.time.elapsed} '`}
        {eventImage && <Image src={eventImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }} />}
        <Link to={`/player/${event.player.id}`} className='customLink'>
            {event.player.name} 
        </Link>
        <Link to={`/player/${event.assist.id}`} className='customLink'>
            <span className='text-secondary ms-1'>
              {event.assist.name && `(${event.assist.name})`}
            </span>
        </Link>
      </div>
    );
  };

  return (
    <Container className='ps-5 pb-5 pe-5'>
      {events.map((event, index) => (
        <Row key={index} className='mb-3'>
          {renderEvent(event, event.team.id)}
        </Row>
      ))}
    </Container>
  )
}
export default GameSummary