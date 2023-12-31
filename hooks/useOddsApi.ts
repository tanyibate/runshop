import { useQuery } from "react-query";
import { Odd } from ".prisma/client";
import api from "../utils/api";
import { useState } from "react";
import { FilterType } from "@/components/filter/Filter";
import debounce from "lodash.debounce";
import { BookmakerWithOdds } from "@/utils/types";

const useOddsApi = (fixture_id: number, initialData: BookmakerWithOdds[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timestamp, setTimestamp] = useState(new Date().toISOString());
  const debouncedUpdateTimestamp = debounce(
    (value) => setTimestamp(value),
    500
  );
  const timestampFilterType: FilterType = {
    label: "Odds at time of",
    type: "datetime",
    value: timestamp,
    setter: debouncedUpdateTimestamp,
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
        .then((res) => res.data),
    {
      initialData: initialData,
    }
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
