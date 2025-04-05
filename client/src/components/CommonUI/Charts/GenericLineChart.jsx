import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import NotFound from '../NotFound';
import useButtonGroup from '../../../hooks/ui/useButtonGroup';
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

const GenericLineChart = ({ 
    data, 
    options, 
    defaultSelected,
    tooltipLabel = "Value"
}) => {
    const { selected, handleButtonState, isActiveButton } = useButtonGroup(defaultSelected);

    const getLineChartConfig = (data, dataPath, label, borderColor) => {
        // Navega pelos níveis do objeto até chegar aos dados desejados
        const pathParts = dataPath.split('.');
        let currentData = data;
        
        for (const part of pathParts) {
            if (!currentData || !currentData[part]) return null;
            currentData = currentData[part];
        }
        
        // Se chegar aqui, os dados estão no formato correto
        const entries = Object.entries(currentData);
        
        return {
            lineChartData: {
                labels: entries.map(([key]) => key),
                datasets: [
                    {
                        label,
                        data: entries.map(([_, value]) => value.total ?? 0),
                        fill: true,
                        borderColor,
                        tension: 0.1,
                    },
                ],
            },
            lineChartOptions: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: label, 
                        color: '#ffffff',
                        font: { size: 16 },
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => `${tooltipLabel}: ${tooltipItem.raw}`,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff', font: { size: 12 } },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#ffffff', font: { size: 12 } },
                    },
                },
            },
        };
    };

    const renderChart = () => {
        // Encontra a opção selecionada
        const selectedOption = options.find(option => option.key === selected);
        if (!selectedOption) return <div>Opção não encontrada</div>;
        
        // Obtém a configuração do gráfico
        const chartConfig = getLineChartConfig(
            data, 
            selectedOption.dataPath, 
            selectedOption.chartLabel, 
            selectedOption.borderColor
        );
        
        return chartConfig ? (
            <Line data={chartConfig.lineChartData} options={chartConfig.lineChartOptions} />
        ) : (
            <NotFound />
        );
    };

    return (
        <Container>
            <Row>
                <div className="overflow-auto">
                    <ButtonGroup className="w-50 secondary-custom-button mb-3">
                        {options.map((option) => (
                            <Button
                                key={option.key}
                                className={isActiveButton(option.key)}
                                onClick={() => handleButtonState(option.key)}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </Row>
            <Row>
                {renderChart()}
            </Row>
        </Container>
    );
};

export default GenericLineChart