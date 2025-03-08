import React, { useState, useEffect } from "react";
import { Container, Row, Dropdown } from 'react-bootstrap';
import GamesList from "./GamesList";

const MatchDateSelector = ({topLeaguesIDs}) => {
  
  const [ selectedDate, setSelectedDate ] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // devido às limitações no nº de reqs diários na API apenas serão mostrados 
  // jogos dos 7 dias anteriores e não do próprio dia
  const getLastSevenDays = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }

    return dates;
  }

  const lastSevenDays = getLastSevenDays();

  useEffect(() => {
    setSelectedDate(lastSevenDays[0]);
  }, [])

  const handleDropdownSelect = (eventKey) => {
    const selectedDay = lastSevenDays.find(day => day === eventKey);
    if (selectedDay) {
      setSelectedDate(eventKey);
    }
  }
  return ( 
    <Container>
      <Row>
          <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {selectedDate ? (
                      <>
                          {selectedDate}
                      </>
                  ) : (
                      "Selecione uma data"
                  )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark text-white">
                  {lastSevenDays.map((day) => (
                      <Dropdown.Item key={day} eventKey={day} className="bg-dark text-white">
                          {day}
                      </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
          </Dropdown>
      </Row>
      <Row>
        <GamesList date={selectedDate} topLeaguesIDs={topLeaguesIDs} />
      </Row>
    </Container>
  )
}
export default MatchDateSelector