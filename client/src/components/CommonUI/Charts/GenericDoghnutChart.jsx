import { Row } from 'react-bootstrap';
import { generateColors } from '../../../utils/helpers';
import NotFound from '../NotFound';
import { Doughnut } from 'react-chartjs-2';
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

const GenericDoughnutChart = ({ 
    data, 
    title, 
    labelKey, 
    valueKey, 
    colors, 
    tooltipFormatter, 
    height = 250, 
    showPercentage = false,
    total = null 
}) => {

    if (!data || (Array.isArray(data) && data.length === 0)) return <NotFound />;
    
    let labels = [];
    let values = [];
    
    if (Array.isArray(data)) {
        // Se for um array de objetos (como em lineups)
        if (typeof data[0] === 'object') {
            labels = data.map(item => item[labelKey]);
            values = data.map(item => item[valueKey]);
        } 
        // Se for um array simples (como em [scored, missed])
        else {
            labels = labelKey;
            values = data;
        }
    } 
    // Se for um objeto (como no componente de penalties)
    else if (typeof data === 'object') {
        labels = labelKey;
        values = valueKey.map(key => {
            const parts = key.split('.');
            let value = data;
            for (const part of parts) {
                value = value[part];
            }
            return typeof value === 'object' ? value.total : value;
        });
        
        // Se um total não foi fornecido, calcular a soma
        if (total === null && showPercentage) {
            total = values.reduce((acc, val) => acc + val, 0);
        }
    }
    
    // Usa cores fornecidas ou gera automaticamente
    const chartColors = colors || generateColors(values.length);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: values,
                backgroundColor: chartColors,
                borderColor: '#ffffff',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
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
                text: title, 
                color: '#ffffff', 
                font: {
                    size: 16, 
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        // Usa o formatter personalizado se fornecido
                        if (tooltipFormatter) {
                            return tooltipFormatter(tooltipItem);
                        }
                        
                        // Formatter padrão com possibilidade de mostrar percentagem
                        let label = `${tooltipItem.label}: ${tooltipItem.raw}`;
                        
                        if (showPercentage && total > 0) {
                            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                            label += ` (${percentage}%)`;
                        }
                        
                        return label;
                    },
                },
            },
        },
    };

    return (
        <Row>
            <Doughnut data={chartData} options={chartOptions} height={height}/>
        </Row>
    );
};

export default GenericDoughnutChart;