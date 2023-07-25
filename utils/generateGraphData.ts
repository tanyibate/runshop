import { Odd } from ".prisma/client";
import { ChartDataWithParameter } from "./types";
import dateToLocaleString from "./dateToLocaleString";

const generateGraphData = (data: Odd[]) => {
  data = data.map((odd) => {
    if (odd.market_parameters === null) {
      odd.market_parameters = -1;
    }
    return odd;
  });
  const arrayOfChartDataWithParameter: ChartDataWithParameter[] = [];
  data.forEach((odd) => {
    const index = arrayOfChartDataWithParameter.findIndex(
      (chartData) => chartData.parameter === odd.market_parameters
    );
    if (index === -1) {
      if (odd.market_parameters === -1) {
        arrayOfChartDataWithParameter.push({
          parameter: odd.market_parameters as number,
          data: [
            {
              timestamp: dateToLocaleString(
                odd.timestamp as unknown as string,
                true
              ),
              win: odd.prices[0],
              draw: odd.prices[1],
              loss: odd.prices[2],
            },
          ],
        });
      } else {
        arrayOfChartDataWithParameter.push({
          parameter: odd.market_parameters as number,
          data: [
            {
              timestamp: dateToLocaleString(
                odd.timestamp as unknown as string,
                true
              ),
              over: odd.prices[0],
              under: odd.prices[1],
            },
          ],
        });
      }
    } else {
      if (odd.market_parameters === -1) {
        arrayOfChartDataWithParameter[index].data.push({
          timestamp: dateToLocaleString(
            odd.timestamp as unknown as string,
            true
          ),
          win: odd.prices[0],
          draw: odd.prices[1],
          loss: odd.prices[2],
        });
      } else {
        arrayOfChartDataWithParameter[index].data.push({
          timestamp: dateToLocaleString(
            odd.timestamp as unknown as string,
            true
          ),
          over: odd.prices[0],
          under: odd.prices[1],
        });
      }
    }
  });

  return arrayOfChartDataWithParameter;
};

export default generateGraphData;
