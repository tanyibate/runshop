import { ChartData, ChartDataWithParameter } from "./types";

const returnChartData = (
  chartData: ChartDataWithParameter[],
  filter: number
) => {
  return chartData.find((data) => data.parameter === filter)?.data;
};

export default returnChartData;
