import GenericLineChart from '../../../CommonUI/Charts/GenericLineChart';

const CardsStats = ({ cards }) => {
    console.log('csa', cards)
    const options = [
        {
            key: 'yellow',
            label: 'Yellow',
            dataPath: 'yellow',
            chartLabel: 'Yellow cards',
            borderColor: '#e6ed0c'
        },
        {
            key: 'red',
            label: 'Red',
            dataPath: 'red',
            chartLabel: 'Red cards',
            borderColor: '#ff4037'
        }
    ];

    return (
        <GenericLineChart 
            data={cards} 
            options={options} 
            defaultSelected="yellow"
            tooltipLabel="Cards"
        />
    );
};

export default CardsStats