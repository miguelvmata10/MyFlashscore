import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './TeamMemberCard.css';

const TeamMemberCard = ({ id, photo, name, number, age, role }) => {
  if (role === 'player') {
    return (
      <Link to={`/player/${id}`} className='customCardLink'>
        <Card className="teamMemberCard p-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Card.Img 
                src={photo} 
                className="cardImage" 
                alt={`Foto do ${name}`}
              />
            </Col>
            <Col>
              <Card.Body className="teamMemberCardBody">
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
  } else if (role === 'coach') {
    return (
      <Link to={`/coach/${id}`} className='customCardLink'>
        <Card className="teamMemberCard p-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Card.Img 
                src={photo} 
                className="cardImage" 
                alt={`Foto do ${name}`}
              />
            </Col>
            <Col>
              <Card.Body className="teamMemberCardBody">
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  Idade: {age}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
};

export default TeamMemberCard;
