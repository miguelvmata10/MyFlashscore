import React, { useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { fetchCoachTrophies } from '../../services/PeopleService';
import useApiRequest from '../../hooks/useApiRequest';

export const CoachCarrer = ({carrer}) => {
    return (
        <Table striped hover responsive variant="dark">
          <thead>
              <tr>
                <th>De</th>
                <th>Até</th>
                <th>Clube</th>
              </tr>
          </thead>
          <tbody>
            {carrer.map((job, index) => (
              <tr key={index}>
                <td>{job.start}</td>
                <td>{job.end ? job.end : '-'}</td>
                <td><Image className="imageResize me-2" src={job.team.logo}/>
                  <Link to={`/team/${job.team.id}`} className="customLink ms-1">{job.team.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    );
}

export const CoachTrophies = ({}) => {
  const { coachID } = useParams();
  const { data: coachTrophies, loading, error, fetchData } = useApiRequest(fetchCoachTrophies);

  useEffect(() => {
      if (coachID) {
          fetchData(coachID);
      }
  }, [coachID, fetchData]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!coachTrophies) return <p>Nenhum dado disponível.</p>;

  // necessário filtrar apenas os troféus ganhos, pois a API retorna campeonatos ganhos e vice-campeonatos
  const filteredCoachTrophies = coachTrophies.filter(trophy => trophy.place === 'Winner');

  return (
    <Table striped hover responsive variant="dark">
      <thead>
          <tr>
            <th>Época</th>
            <th>País</th>
            <th>Competição</th>
          </tr>
      </thead>
      <tbody>
        {filteredCoachTrophies.map((trophy, index) => (
          <tr key={index}>
            <td>{trophy.season}</td>
            <td>{trophy.country}</td>
            <td>{trophy.league}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}