import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { fetchCoachTrophies } from '../../../services/PeopleService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';

const CoachTrophies = () => {
  const { coachID } = useParams();
  const { data: coachTrophies, loading, error, fetchData } = useApiRequest(fetchCoachTrophies);

  useEffect(() => {
      if (coachID) {
          fetchData(coachID);
      }
  }, [coachID, fetchData]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error.message}</p>;
  if (!coachTrophies || coachTrophies.length === 0 ) return <NotFound />;

  // necessário filtrar apenas os troféus ganhos, pois a API retorna campeonatos ganhos e vice-campeonatos
  const filteredCoachTrophies = coachTrophies.filter(trophy => trophy.place === 'Winner');

  return (
    <>
      <h2 className='mb-3'><b>{filteredCoachTrophies.length} troféus ganhos</b></h2>

      {filteredCoachTrophies.length > 0 && (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Table striped hover variant="dark" className='text-center'>
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
        </div>
      )}
    </>
  );
}

export default CoachTrophies