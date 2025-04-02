import GenericDoughnutChart from "../../../../CommonUI/Charts/GenericDoghnutChart";

const PenaltiesStats = ({ penalty }) => {
    return (
        <GenericDoughnutChart
            data={penalty}
            title="Penalties statistics"
            labelKey={['Scored', 'Missed']}
            valueKey={['scored.total', 'missed.total']}
            colors={['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)']}
            showPercentage={true}
            total={penalty.total}
        />
    );
};

export default PenaltiesStats