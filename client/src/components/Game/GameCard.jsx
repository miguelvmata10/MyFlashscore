import { Image, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameStyles.css';

const GameCard = ({GameData, key}) => {
  return (
    <Link to={`/game/${GameData.fixture.id}`} key={key} className='customCardLink'>
      <Card className='bg-transparent text-white gameCard border-2 border-dark'>
        <Card.Body>
          <Row>
              <Col className='text-end'>
                <span className='me-1'>{GameData.teams.home.name}</span>
                <Image src={GameData.teams.home.logo} className='imageResize'/>
              </Col>
              <Col className='text-center'>
                  <h6>{GameData.goals.home} - {GameData.goals.away}</h6>
              </Col>
              <Col className='text-start'>
                <Image src={GameData.teams.away.logo} className='imageResize'/>
                <span className='ms-1'>{GameData.teams.away.name}</span>
              </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>
  )
}
export default GameCard