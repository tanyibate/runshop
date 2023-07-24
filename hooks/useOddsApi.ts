import { useQuery } from "react-query";
import { Fixture, Odd } from ".prisma/client";
import api from "../utils/api";
import { useState } from "react";
import { FilterType } from "@/components/filter/Filter";

export type BookmakerWithOdds = {
  name: string;
  odds: Odd[];
};

const useOddsApi = (fixture_id: number) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timestamp, setTimestamp] = useState(new Date().toISOString());
  console.log(timestamp);
  const timestampFilterType: FilterType = {
    label: "Odds at time of",
    type: "datetime",
    value: timestamp,
    setter: (value: string) => setTimestamp(value),
  };

  const {
    data: bookmakersWithOdds,
    isLoading: oddsAreLoading,
    isError: oddsApiHasError,
    error: oddsApiError,
  } = useQuery<BookmakerWithOdds[]>(
    ["odds", fixture_id, searchQuery, timestamp],
    () =>
      api
        .get(`/odds`, {
          params: {
            fixture_id: fixture_id,
            searchQuery: searchQuery,
            timestamp: timestamp,
          },
        })
        .then((res) => res.data)
  );

  return {
    bookmakersWithOdds,
    oddsAreLoading,
    oddsApiError,
    oddsApiHasError,
    searchQuery,
    setSearchQuery,
    timestampFilterType,
  };
};

export default useOddsApi;
