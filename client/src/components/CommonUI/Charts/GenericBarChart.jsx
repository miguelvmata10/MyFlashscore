import { Row } from 'react-bootstrap';
import NotFound from '../NotFound';
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

const GenericBarChart = ({ 
    datasets,
    labels = ['Total', 'Home', 'Away'],
    colors = ['#ff4037', '#344FEB', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    title = '',
    customOptions = {},
    responsive = true,
    legendPosition = 'top',
    beginAtZero = true
}) => {

    if (!datasets || datasets.length === 0) {
        return <NotFound />;
      }
    
      // Garante que valores nulos ou indefinidos sejam tratados como 0
      const safeGet = (value) => value ?? 0;
    
      // Prepara os datasets para o gráfico
      const chartDatasets = datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data.map(safeGet),
        backgroundColor: dataset.color || colors[index % colors.length],
      }));
    
      const barData = {
        labels,
        datasets: chartDatasets,
      };
      
      // Opções padrão do gráfico
      const defaultOptions = {
        responsive,
        plugins: {
          title: {
            display: title,
            text: title,
            color: '#ffffff',
            font: {
              size: 16,
            }
          },
          legend: {
            labels: {
              color: '#ffffff', 
              font: {
                size: 12, 
              },
            },
            position: legendPosition, 
          },
        },
        scales: {
          y: {
            beginAtZero, 
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
    
      // Junta as opções padrão com as opções personalizadas
      const barOptions = {
        ...defaultOptions,
        ...customOptions,
        // Garante que opções aninhadas também sejam juntadas corretamente
        plugins: {
          ...defaultOptions.plugins,
          ...(customOptions.plugins || {})
        },
        scales: {
          ...defaultOptions.scales,
          ...(customOptions.scales || {})
        }
      };
    
      return (
        <Row>
          <Bar data={barData} options={barOptions} />
        </Row>
      );
};

export default GenericBarChart