import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../CommonUI/ElementCard.css';
import FallbackImage from './FallbackImage';
import './ElementCard.css';

// possiveis 'role': player, coach, team e league
const ElementCard = ({ role, id, photo, name, number, age }) => {
  // componentes do tipo 'player' e 'coach' têm uma classe css adicional para poder arredondar a foto de perfil
  const roleClass = role === 'player' || role === 'coach' ? "borderRadiousElement" : "";

  return (
    <Link to={`/${role}/${id}`} className='customCardLink'>
      <Card className="elementCard" style={{ height: '80px' }}>
        <Row className="ps-2 align-items-center h-100">
            <Col xs="auto" style={{ paddingRight: '15px' }}>
              <FallbackImage 
                  src={photo}
                  type={role === 'player' || role === 'coach' ? 'player' : role === 'team' ? 'team' : 'league' } 
                  className={`${roleClass}`}
                  alt={`Imagem do ${name}`}
                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              />
            </Col>
            <Col className='ps-0 elementCardBody'>
              <div style={{ fontWeight: 'bold', color: 'white' }}>
                {name}
              </div>
              <div className='text-secondary' style={{ fontSize: '14px' }}>
                {role === 'player' && age ? `Age: ${age}` : ''} 
                {role === 'player' && number ? (age ? ` • Nº ${number}` : `Nº ${number}`) : ''}
              </div>
            </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default ElementCard
