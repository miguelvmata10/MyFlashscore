import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../GameStyles.css';
import GameCardStandardLayout from './GameCardStandardLayout';
import GameCardCompactLayout from './GameCardCompactLayout';

const formatDate = (date) => {
  const formattedDate = new Date(date);
  return {
    gameTime: `${String(formattedDate.getHours()).padStart(2, '0')}h${String(formattedDate.getMinutes()).padStart(2, '0')}`,
    gameDate: `${String(formattedDate.getDate()).padStart(2, '0')}/${String(formattedDate.getMonth() + 1).padStart(2, '0')}/${formattedDate.getFullYear()}`
  };
};

const GameCard = ({ GameData, bgColor = "bg-transparent", cardType = 'standard'}) => {
  console.log('GAME DATA: ', GameData);
  const formattedDate = GameData?.fixture?.date ? formatDate(GameData.fixture.date) : { gameTime: '??:??', gameDate: '??/??/????' };
  const gameStatus = GameData?.fixture?.status?.short || 'NS';

  // estados durante ou após o jogo
  const inPlayOrFinishedStatuses  = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT', 'FT', 'AET', 'PEN', 'LIVE'];

  // Define os grupos de estados do jogo -> estados de jogos problemáticos (adiados, cancelados, etc...)
  const statusMessages = {
    PST: 'Adiado',
    CANC: 'Cancelado',
    ABD: 'Abandonado',
    SUSP: `${GameData?.goals?.home ?? '?'} - ${GameData?.goals?.away ?? '?'} (SUSP)`,
    WO: 'Não realizado',
    AWD: 'Não realizado'
  };

  const renderGameStatus = () => {
    if (statusMessages[gameStatus]) {
      return <h6 className="text-danger">{statusMessages[gameStatus]}</h6>;
    }

    if (gameStatus === 'TBD') {
      return <h6> 📢 Em breve </h6>;
    }

    if (gameStatus === 'NS' || !inPlayOrFinishedStatuses.includes(gameStatus)) {
      return (
        <>
          <h6>{formattedDate.gameTime}</h6>
          <span className='text-secondary'>{formattedDate.gameDate}</span>
        </>
      );
    }

    return (
      <>
        {cardType === 'standard' ? (
          <>
            <h6>{GameData?.goals?.home ?? '?'} - {GameData?.goals?.away ?? '?'}</h6>
            <span>{gameStatus}</span>
          </>
        ) : (
          <span>{gameStatus}</span>
        )}
      </>
    );
  }
   
  return (
    <Link to={`/game/${GameData.fixture.id}`} className='customCardLink'>
      <Card className={`text-white gameCard border-1 border-dark ${bgColor}`}>
        <Card.Body>
          {cardType === 'standard' ? 
            <GameCardStandardLayout GameData={GameData} renderGameStatus={renderGameStatus} /> : 
            <GameCardCompactLayout 
              inPlayOrFinishedStatuses={inPlayOrFinishedStatuses} 
              GameData={GameData} 
              gameStatus={gameStatus} 
              renderGameStatus={renderGameStatus}
            />
          }
        </Card.Body>
      </Card>
    </Link>
  )
}
export default GameCard