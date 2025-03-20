import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../CommonUI/ElementCard.css';
import FallbackImage from './FallbackImage';

// possiveis 'role': player, coach, team e league
const ElementCard = ({ role, id, photo, name, number, age }) => {
  // componentes do tipo 'player' e 'coach' têm uma classe css adicional para poder arredondar a foto de perfil
  const roleClass = role === 'player' || role === 'coach' ? "borderRadiousElement" : "";

  return (
    <Link to={`/${role}/${id}`} className='customCardLink'>
      <Card className="elementCard p-3">
        <Row className="align-items-center">
            <Col xs="auto">
              <FallbackImage 
                  src={photo}
                  type={role === 'player' || role === 'coach' ? 'player' : 
                    role === 'team' ? 'team' 
                    : 'league' 
                  } 
                  className={`cardImage ${roleClass}`}
                  alt={`Imagem do ${name}`}
              />
            </Col>
            <Col>
              <Card.Body className="elementCardBody">
                  <Card.Title>{name}</Card.Title>
                  {role === 'player' && (
                    <Card.Text>
                      Número: {number} <br />
                      Idade: {age}
                    </Card.Text>
                  )}
              </Card.Body>
            </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ElementCard