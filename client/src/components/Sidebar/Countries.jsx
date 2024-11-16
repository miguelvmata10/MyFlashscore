import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './Countries.css';

const Countries = ({countries}) => {
  return (
    <div>
      {countries.map((country) => (
        <div>
          <img className="countryImage" src={country.flag} alt={country.name} />
          <Button>{country.name}</Button>
        </div>
      ))}
    </div>
  )
}
export default Countries