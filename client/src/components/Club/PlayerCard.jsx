import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './PlayerCard.css';

const PlayerCard = ({ id, photo, name, number, age }) => {
  return (
    <Link to={`/player/${id}`} className='customCardLink'>
      <Card className="playerCard p-3">
        <Row className="align-items-center">
          <Col xs="auto">
            <Card.Img 
              src={photo} 
              className="cardImage" 
              alt={`Foto do ${name}`}
            />
          </Col>
          <Col>
            <Card.Body className="playerCardBody">
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                Número: {number} <br />
                Idade: {age}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default PlayerCard;
