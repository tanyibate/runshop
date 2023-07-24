import { ChartData } from "./types";

const returnChartData = (chartData: ChartData, filter: string) => {
  switch (filter) {
    case "Over Under 0.5 Goals":
      return chartData.overUnder0Point5Data;
    case "Over Under 1.5 Goals":
      return chartData.overUnder1Point5Data;
    case "Over Under 2.5 Goals":
      return chartData.overUnder2Point5Data;
    case "Win Draw Loss":
      return chartData.winLossDrawData;
  }
};

export default returnChartData;
