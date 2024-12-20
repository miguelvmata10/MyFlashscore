import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { fetchTeamStatistics } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Filler,
    Title,
    Tooltip,
    Legend
);

const SquadStatistics = ({leagueID, season}) => {
    const { teamID } = useParams()
    const { data: statistics, loading, error, fetchData } = useApiRequest(fetchTeamStatistics);

     useEffect(() => {
        if (teamID && leagueID && season) {
            fetchData(teamID, leagueID, season);    
        }
    }, [teamID, leagueID, season, fetchData])

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!statistics) return <p>Nenhum dado disponível.</p>;

    console.log('ESTATISTICAS: ', statistics);

    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Vendas',
            data: [12, 19, 3, 5, 2],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Gráfico de Linhas',
          },
        },
      };

    return (
        <>
        <div>Dados para apresentar: liga com o id {leagueID} na época {season} para a equipa com o id { teamID }. </div>
        <Line data={data} options={options} />
        </>
    )
}

export default SquadStatistics