import { Odd } from ".prisma/client";
import { OverUnderChartData, WinLossDrawChartData } from "./types";

const generateGraphData = (
  data: Odd[],
  setChartData: {
    (value: {
      overUnder0Point5Data: OverUnderChartData[];
      overUnder1Point5Data: OverUnderChartData[];
      overUnder2Point5Data: OverUnderChartData[];
      winLossDrawData: WinLossDrawChartData[];
    }): void;
    (arg0: {
      overUnder0Point5Data: OverUnderChartData[];
      overUnder1Point5Data: OverUnderChartData[];
      overUnder2Point5Data: OverUnderChartData[];
      winLossDrawData: WinLossDrawChartData[];
    }): void;
  }
) => {
  let overAndUnderOdds1Point5: Odd[] = [],
    overAndUnderOdds0Point5: Odd[] = [],
    overAndUnderOdds2Point5: Odd[] = [],
    winDrawLossOdds: Odd[] = [];

  const overUnder0Point5Data: OverUnderChartData[] = [],
    overUnder1Point5Data: OverUnderChartData[] = [],
    overUnder2Point5Data: OverUnderChartData[] = [],
    winLossDrawData: WinLossDrawChartData[] = [];

  overAndUnderOdds0Point5 = data.filter((odd) => odd.market_parameters === 0.5);
  overAndUnderOdds1Point5 = data.filter((odd) => odd.market_parameters === 1.5);
  overAndUnderOdds2Point5 = data.filter((odd) => odd.market_parameters === 2.5);
  winDrawLossOdds = data.filter((odd) => odd.market_parameters === null);

  overAndUnderOdds0Point5.forEach((odd) => {
    overUnder0Point5Data.push({
      timestamp: odd.timestamp as unknown as string,
      over: odd.prices[0],
      under: odd.prices[1],
    });
  });

  overAndUnderOdds1Point5.forEach((odd) => {
    overUnder1Point5Data.push({
      timestamp: odd.timestamp as unknown as string,
      over: odd.prices[0],
      under: odd.prices[1],
    });
  });

  overAndUnderOdds2Point5.forEach((odd) => {
    overUnder2Point5Data.push({
      timestamp: odd.timestamp as unknown as string,
      over: odd.prices[0],
      under: odd.prices[1],
    });
  });

  winDrawLossOdds.forEach((odd) => {
    winLossDrawData.push({
      timestamp: odd.timestamp as unknown as string,
      win: odd.prices[0],
      draw: odd.prices[1],
      loss: odd.prices[2],
    });
  });

  // Now sort the data by timestamp ascending
  overUnder0Point5Data.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  overUnder1Point5Data.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  overUnder2Point5Data.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  winLossDrawData.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  setChartData({
    overUnder0Point5Data,
    overUnder1Point5Data,
    overUnder2Point5Data,
    winLossDrawData,
  });
};

export default generateGraphData;
