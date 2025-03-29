import { Row } from 'react-bootstrap';
import NotFound from '../../../CommonUI/NotFound';
import { Bar } from 'react-chartjs-2';
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

const CleanSheetFailedToScoreStats = ({ statistics }) => {
  if (!statistics || !statistics.clean_sheet || !statistics.failed_to_score ) return <NotFound />;

  // Função para garantir que valores nulos ou indefinidos sejam tratados como 0
  const safeGet = (value) => value ?? 0;

  const barGameData = {
    labels: ['Total', 'Home', 'Away'],
    datasets: [
        {
            label: 'Clean Sheet',
            data: [
              safeGet(statistics.clean_sheet.total),
              safeGet(statistics.clean_sheet.home),
              safeGet(statistics.clean_sheet.away),
            ],
            backgroundColor: '#ff4037',
        },
        {
            label: 'Failed to score',
            data: [
              safeGet(statistics.failed_to_score.total),
              safeGet(statistics.failed_to_score.home),
              safeGet(statistics.failed_to_score.away),
            ],
            backgroundColor: '#344FEB',
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
  return (
    <Row>
      <Bar data={barGameData} options={barGameOptions} />
    </Row>
  )
}
export default CleanSheetFailedToScoreStats