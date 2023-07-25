import { useQuery } from "react-query";
import { Odd } from ".prisma/client";
import api from "../utils/api";
import generateGraphData from "@/utils/generateGraphData";
import { ChartDataWithParameter } from "@/utils/types";

const useBookmakerApi = (fixture_id: number, bookmaker_id: number) => {
  const {
    isLoading,
    isError,
    error,
    data: chartData,
  } = useQuery<ChartDataWithParameter[]>(
    ["odds", fixture_id, bookmaker_id],
    () =>
      api
        .get(`/odds/bookmaker/${bookmaker_id}`, {
          params: {
            fixture_id: fixture_id,
          },
        })
        .then((res) => {
          return generateGraphData(res.data);
        })
  );

  return {
    chartData,
    isLoading,
    isError,
    error,
  };
};

export default useBookmakerApi;
