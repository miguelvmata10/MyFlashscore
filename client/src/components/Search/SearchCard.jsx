import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import '../Club/TeamMemberCard.css';

const SearchCard = ({ id, photo, name }) => {
  return (
    <Card className="teamMemberCard p-3">
    <Row className="align-items-center">
        <Col xs="auto">
        <Card.Img 
            src={photo} 
            className="cardImage" 
        />
        </Col>
        <Col>
        <Card.Body className="teamMemberCardBody">
            <Card.Title>{name}</Card.Title>
        </Card.Body>
        </Col>
    </Row>
    </Card>
  );
};

export default SearchCard;
