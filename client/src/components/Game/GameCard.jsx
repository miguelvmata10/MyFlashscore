import { Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameStyles.css';
import FallbackImage from '../CommonUI/FallbackImage';

const formatDate = (date) => {
  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  const hours = String(formattedDate.getHours()).padStart(2, '0');
  const minutes = String(formattedDate.getMinutes()).padStart(2, '0');

  return {
    gameTime: `${hours}h${minutes}`,
    gameDate: `${day}/${month}/${year}`
  };
}

const GameCard = ({ GameData }) => {
  const formattedDate = formatDate(GameData.fixture.date);
  const gameStatus = GameData.fixture.status.short;

  // estados de jogos problemáticos (adiados, cancelados, etc...)
  const irregularStatuses = ['SUSP', 'PST', 'CANC', 'ABD', 'WO', 'AWD'];
  const isIrregularGame = irregularStatuses.includes(gameStatus);

  // os estados pré-jogo são verificados individualmente dentro do jsx, pois são apenas dois casos 
  // e em ambos o comportamento é diferente

  // estados durante ou após o jogo
  const inPlayOrFinishedMatchStatuses = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT', 'FT', 'AET', 'PEN', 'LIVE'];
  const isInPlayOrFinishedGame= inPlayOrFinishedMatchStatuses.includes(gameStatus);

  const renderMessage = () => {
    switch (gameStatus) {
      case 'PST':
        return 'Adiado';
      case 'CANC':
        return 'Cancelado';
      case 'ABD':
        return 'Abandonado';
      case 'SUSP':
        return `${GameData.goals.home} - ${GameData.goals.away} (SUSP)`;
      case 'WO':
      case 'AWD':
        return 'Não realizado';
      default:
        return null;
    }
  };

  return (
    <Link to={`/game/${GameData.fixture.id}`} className='customCardLink'>
      <Card className='bg-transparent text-white gameCard border-2 border-dark'>
        <Card.Body>
          <Row>
            <Col className='text-end'>
              <span className='me-1'>{GameData.teams.home.name}</span>
              <FallbackImage type='team' src={GameData.teams.home.logo} className='imageResize'/>
            </Col>

            <Col className="text-center">
              {isIrregularGame ? (
                <h6 className="text-danger">{renderMessage()}</h6>
              ) : gameStatus === 'TBD' ? (
                <h6>📢 Em breve</h6>
              ) : gameStatus === 'NS' ? (
                <>
                  <h6>{formattedDate.gameTime}</h6>
                  <span className='text-secondary'>{formattedDate.gameDate}</span>
                </>
              ) : isInPlayOrFinishedGame ? (
                <>
                  <h6>{GameData.goals.home} - {GameData.goals.away}</h6>
                  <span className="text-secondary">{GameData.fixture.status.short}</span>
                </>
              ) : (
                <>
                  <h6>{formattedDate.gameTime}</h6>
                  <span className="text-secondary">{formattedDate.gameDate}</span>
                </>
              )}
            </Col>

            <Col className='text-start'>
              <FallbackImage type='team' src={GameData.teams.away.logo} className='imageResize'/>
              <span className='ms-1'>{GameData.teams.away.name}</span>
            </Col>
            
          </Row>
        </Card.Body>
      </Card>
    </Link>
  )
}
export default GameCard