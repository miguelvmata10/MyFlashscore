import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { fetchTeamStatistics } from '../../services/TeamsService';
import useApiRequest from '../../hooks/useApiRequest';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
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
    scales,
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

  // Jogos -> vitórias, derrotas e empates em casa e fora
  const barGameData = {
    labels: ['Total', 'Casa', 'Fora'],
    datasets: [
        {
            label: 'Jogos',
            data: [
              statistics.fixtures.played.total,
              statistics.fixtures.played.home,
              statistics.fixtures.played.away
            ],
            backgroundColor: '#4caf50',
        },
        {
            label: 'Vitórias',
            data: [
              statistics.fixtures.wins.total,
              statistics.fixtures.wins.home,
              statistics.fixtures.wins.away
            ],
            backgroundColor: '#2196f3',
        },
        {
            label: 'Empates',
            data: [
              statistics.fixtures.draws.total,
              statistics.fixtures.draws.home,
              statistics.fixtures.draws.away
            ],
            backgroundColor: '#ffc107',
        },
        {
            label: 'Derrotas',
            data: [
              statistics.fixtures.loses.total,
              statistics.fixtures.loses.home,
              statistics.fixtures.loses.away
            ],
            backgroundColor: '#f44336',
        },
    ],
  };
  const barGameOptions = {
      responsive: true,
      plugins: {
        legend: {
            labels: {
                color: '#ffffff', 
                font: {
                    size: 12, 
                },
            },
            position: 'top', 
        },
        title: {
          display: true,
          text: 'Total, Casa e Fora', 
          color: '#ffffff', 
          font: {
              size: 16, 
          },
        },
      },
      scales: {
        y: {
            beginAtZero: true, 
            ticks: {
                color: '#ffffff', 
                font: {
                    size: 12, 
                },
            },
        },
        x: {
            ticks: {
                color: '#ffffff', 
                font: {
                    size: 12, 
                },
            },
        },
    },
  };


  // Sistemas Táticos usados 
  const tacticalData = statistics.lineups;  
  const tacticalLabels = tacticalData.map(item => item.formation); 
  const tacticalUsage = tacticalData.map(item => item.played); 

  // Função para gerar cores dinâmicas
  function generateColors(num) {
    const colors = [];
    const colorPalette = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C00', '#A8D0FF', '#FF9E9D', '#F5D300', '#7E8F7C']; 
    for (let i = 0; i < num; i++) {
        // Se o número de dados for maior que o número de cores disponíveis, então reutiliza as cores
        colors.push(colorPalette[i % colorPalette.length]);
    }
    return colors;
  }

  const tacticalChartData = {
      labels: tacticalLabels,
      datasets: [
          {
              label: 'Formações Usadas',
              data: tacticalUsage,
              backgroundColor: generateColors(tacticalUsage.length),
              borderColor: '#ffffff',
              borderWidth: 1,
          },
      ],
  };

  const tacticalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#ffffff',
                font: {
                    size: 12,
                },
            },
        },
        title: {
          display: true,
          text: 'Sistemas táticos utilizados', 
          color: '#ffffff', 
          font: {
              size: 16, 
          },
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw} jogos`;
                },
            },
        },
    },
  };

  // Golos por minuto
  // Configuração do gráfico de linha para os gols por intervalo de minutos
  const lineChartData = {
    labels: ['0-15', '16-30', '31-45', '46-60', '61-75', '76-90', '91-105'],  
    datasets: [
        {
            label: 'Gols Marcados',
            data: [
                statistics.goals.for.minute['0-15'].total || 0,  
                statistics.goals.for.minute['16-30'].total || 0, 
                statistics.goals.for.minute['31-45'].total || 0, 
                statistics.goals.for.minute['46-60'].total || 0, 
                statistics.goals.for.minute['61-75'].total || 0, 
                statistics.goals.for.minute['76-90'].total || 0, 
                statistics.goals.for.minute['91-105'].total || 0, 
            ],
            fill: false,  
            borderColor: '#ff4037',  
            tension: 0.1,  
        },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Golos Marcados por minuto',
            color: '#ffffff',
            font: {
                size: 16,
            },
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `Gols: ${tooltipItem.raw}`;  
                },
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#ffffff',
                font: {
                    size: 12,
                },
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: '#ffffff',
                font: {
                    size: 12,
                },
            },
        },
    },
  };

  // Média de golos
  const totalGoalsData = {
    labels: ['Casa', 'Fora', 'Total'], 
    datasets: [
        {
            label: 'Golos Marcados',
            data: [
                statistics.goals.for.total.home,  
                statistics.goals.for.total.away,  
                statistics.goals.for.total.total, 
            ],
            backgroundColor: ['#4caf50', '#2196f3', '#f44336'], 
            borderColor: '#ffffff', 
            borderWidth: 1, 
        },
    ],
  };

  const totalGoalsOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Golos Marcados',
            color: '#ffffff',
            font: {
                size: 16,
            },
        },
        legend: {
            display: false, 
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `Total de Golos: ${tooltipItem.raw}`;
                },
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#ffffff',
                font: {
                    size: 12,
                },
            },
        },
        y: {
            beginAtZero: true, 
            ticks: {
                color: '#ffffff',
                font: {
                    size: 12,
                },
            },
        },
    },
  };

  return (
      <>
        <Container className="p-2 mt-2 rounded-4">
          <h4>Jogos</h4>   
          <Row>
            <Col xs={12} md={6}>
              <Bar data={barGameData} options={barGameOptions} />
            </Col>
            <Col xs={12} md={6}>
              <Doughnut data={tacticalChartData} options={tacticalChartOptions} height={250}/>
            </Col>
          </Row>
                
          <h4>Golos</h4>
          <Row>
            <Col xs={12} md={6}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Col>
            <Col xs={12} md={6}>
              <Bar data={totalGoalsData} options={totalGoalsOptions} />
            </Col>
          </Row>
                
        </Container>
      </>
  )
}

export default SquadStatistics