import GenericLineChart from '../../../../CommonUI/Charts/GenericLineChart';

const GoalsPerMinStats = ({ goals }) => {
    const options = [
        {
            key: 'scored',
            label: 'Scored',
            dataPath: 'for.minute',
            chartLabel: 'Scored goals',
            borderColor: '#ff4037'
        },
        {
            key: 'conceded',
            label: 'Conceded',
            dataPath: 'against.minute',
            chartLabel: 'Conceded goals',
            borderColor: '#344FEB'
        }
    ];

    return (
        <GenericLineChart 
            data={goals} 
            options={options} 
            defaultSelected="scored"
            tooltipLabel="Goals"
        />
    );
};

export default GoalsPerMinStats