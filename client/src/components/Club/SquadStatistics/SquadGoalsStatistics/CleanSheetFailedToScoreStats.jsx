import GenericBarChart from "../../../CommonUI/Charts/GenericBarChart";

const CleanSheetFailedToScoreStats = ({ statistics }) => {
  if (!statistics || !statistics.clean_sheet || !statistics.failed_to_score) {
    return <NotFound />;
  }

  const datasets = [
    {
      label: 'Clean Sheet',
      data: [
        statistics.clean_sheet.total,
        statistics.clean_sheet.home,
        statistics.clean_sheet.away,
      ],
      color: '#ff4037',
    },
    {
      label: 'Failed to score',
      data: [
        statistics.failed_to_score.total,
        statistics.failed_to_score.home,
        statistics.failed_to_score.away,
      ],
      color: '#344FEB',
    },
  ];

  return (
    <GenericBarChart 
      datasets={datasets}
      labels={['Total', 'Home', 'Away']}
    />
  );
};

export default CleanSheetFailedToScoreStats