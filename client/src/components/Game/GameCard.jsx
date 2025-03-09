import { Image, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GameCard = ({GameData}) => {
  return (
    <Card>
      <Card.Body>
        <Row>
            <Col className='text-end'>
                <Link to={`/team/${GameData.teams.home.id}`} className="customLink me-1">
                    <span>{GameData.teams.home.name}</span>
                </Link>
                <Image src={GameData.teams.home.logo} className='imageResize'/>
            </Col>
            <Col className='text-center'>
                <span>{GameData.goals.home} - {GameData.goals.away}</span>
            </Col>
            <Col className='text-start'>
                <Image src={GameData.teams.away.logo} className='imageResize'/>
                <Link to={`/team/${GameData.teams.away.id}`} className="customLink ms-1">
                    <span>{GameData.teams.away.name}</span>
                </Link>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
export default GameCard