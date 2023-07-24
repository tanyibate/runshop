import { useQuery } from "react-query";
import { Odd } from ".prisma/client";
import api from "../utils/api";
import { onSuccess } from "../utils/onSuccess";
import { OverUnderChartData, WinLossDrawChartData } from "@/utils/types";

const useBookmakerApi = (
  fixture_id: number,
  bookmaker_id: number,
  setChartData: (value: {
    overUnder0Point5Data: OverUnderChartData[];
    overUnder1Point5Data: OverUnderChartData[];
    overUnder2Point5Data: OverUnderChartData[];
    winLossDrawData: WinLossDrawChartData[];
  }) => void
) => {
  const { data, isLoading, isError, error } = useQuery<Odd[]>(
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
        onSuccess(data, setChartData);
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
