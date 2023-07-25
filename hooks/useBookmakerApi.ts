import { useQuery } from "react-query";
import { Odd } from ".prisma/client";
import api from "../utils/api";
import generateGraphData from "@/utils/generateGraphData";
import { ChartDataWithParameter } from "@/utils/types";

const useBookmakerApi = (
  fixture_id: number,
  bookmaker_id: number,
  setChartData: (value: ChartDataWithParameter[]) => void
) => {
  const { isLoading, isError, error } = useQuery<Odd[]>(
    ["odds", fixture_id, bookmaker_id],
    () =>
      api
        .get(`/odds/bookmaker/${bookmaker_id}`, {
          params: {
            fixture_id: fixture_id,
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        // Map market parameter null as -1
        data = data.map((odd) => {
          if (odd.market_parameters === null) {
            odd.market_parameters = -1;
          }
          return odd;
        });
        generateGraphData(data, setChartData);
      },
    }
  );

  return {
    isLoading,
    isError,
    error,
  };
};

export default useBookmakerApi;
