import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Countries.css';

const Countries = () => {

  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [loadingLeagues, setLoadingLeagues] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const fetchCountries = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/competitions/countries");
        setCountries(response.data.response);
    } catch (error) {
        console.log(error);
    } finally {
      setLoadingCountries(false);
    }
  }

  const fetchAllLeagues = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/competitions/leagues");
      setLeagues(response.data.response);
    } catch {
      console.error(error);
    } finally {
      setLoadingLeagues(false);
    }
  };

  const filterLeagueByCountry = (countryCode) => {
    const leaguesPerCountry = leagues.filter(league => league.country.code === countryCode);
    setFilteredLeagues(leaguesPerCountry);
  }
  
  useEffect(() => {
    fetchCountries(),
    fetchAllLeagues()
  }, []);

  if (loadingLeagues || loadingCountries) {
    return <div>
        Carregando...
    </div>
  }

  return (
    <div>
      {countries.map((country) => (
        <div>
          <img className="countryImage" src={country.flag} alt={country.name} />
          <NavDropdown key={country.id} title={country.name} menuVariant="dark" onClick={() => filterLeagueByCountry(country.code)}>
            {filteredLeagues.map((league) => (
              <NavDropdown.Item key={league.league.id}>{league.league.name}</NavDropdown.Item>
            ))}
          </NavDropdown>
        </div>
      ))}
    </div>
  )
}
export default Countries