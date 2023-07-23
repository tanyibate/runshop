import { useQuery } from "react-query";
import { Fixture, Odd } from ".prisma/client";
import api from "../utils/api";

export type BookmakerWithOdds = {
  name: string;
  odds: Odd[];
};

const useOddsApi = (fixture_id: number) => {
  const {
    data: bookmakersWithOdds,
    isLoading: oddsAreLoading,
    isError: oddsApiHasError,
    error: oddsApiError,
  } = useQuery<BookmakerWithOdds[]>(["odds", fixture_id], () =>
    api
      .get(`/odds`, {
        params: {
          fixture_id: fixture_id,
        },
      })
      .then((res) => res.data)
  );

  return { bookmakersWithOdds, oddsAreLoading, oddsApiError, oddsApiHasError };
};

export default useOddsApi;
