import React, { useState, useEffect } from "react";
import { Row, Dropdown } from 'react-bootstrap';
import { BsCalendar3 } from 'react-icons/bs'; 
import LeagueMatchSelector from "./LeagueMatchSelector";

const MatchDateSelector = ({topLeaguesIDs}) => {
  
  const [ selectedDate, setSelectedDate ] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Para exibição no botão - formato mais amigável
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    
    // Array com abreviações dos dias da semana 
    const weekdays = ['DO', 'SE', 'TE', 'QU', 'QI', 'SE', 'SA'];
    
    // Obtém a abreviação do dia da semana
    const weekday = weekdays[date.getDay()];
    
    // Obtém dia, mês e ano no formato desejado
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Apenas os últimos 2 dígitos
    
    return `${weekday}, ${day}/${month}/${year}`;
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
    <>
      <Row className="text-end">
          <Dropdown onSelect={handleDropdownSelect} className="mb-2">
              <Dropdown.Toggle 
                variant="danger" 
                id="dropdown-basic"
                className="date-selector-btn"
              >
                  <BsCalendar3 className="me-2" />
                  {selectedDate ? formatDisplayDate(selectedDate) : "Selecione uma data"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark text-white">
                  {lastSevenDays.map((day) => (
                      <Dropdown.Item 
                        key={day} 
                        eventKey={day} 
                        className="bg-dark text-white"
                      >
                          {formatDisplayDate(day)}
                      </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
          </Dropdown>
      </Row>
      <Row>
        <LeagueMatchSelector date={selectedDate} topLeaguesIDs={topLeaguesIDs} />
      </Row>
    </>
  )
}

export default MatchDateSelector