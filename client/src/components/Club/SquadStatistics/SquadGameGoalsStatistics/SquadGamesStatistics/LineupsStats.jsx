import GenericDoughnutChart from "../../../../CommonUI/Charts/GenericDoghnutChart";

const LineupsStats = ({ lineups }) => {
    return (
        <GenericDoughnutChart
            data={lineups}
            title="Team formations"
            labelKey="formation"
            valueKey="played"
            tooltipFormatter={(tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} games`}
        />
    );
};
export default LineupsStats