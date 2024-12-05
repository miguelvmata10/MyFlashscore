import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import './PlayerCard.css';

const PlayerCard = ({ photo, name, number, age }) => {
  return (
    <Card className="playerCard">
      <Row className="align-items-center">
        <Col xs="auto">
          <Card.Img 
            src={photo} 
            className="cardImage" 
            alt={`Foto de ${name}`}
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
  );
};

export default PlayerCard;
