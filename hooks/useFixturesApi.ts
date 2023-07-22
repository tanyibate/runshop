import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { Fixture } from ".prisma/client";
import getFixtureSets from "../utils/getFixtureSets";
import api from "../utils/api";
import { FilterOption } from "@/components/filter";

const useFixtureApi = (initialSearchQuery: string = "") => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [competitionOptions, setCompetitionOptions] = useState<FilterOption[]>([
    { label: "UEFA Europa Conference League", selected: false },
    { label: "UEFA Champions League", selected: false },
    { label: "Serie A", selected: false },
    { label: "La Liga", selected: false },
    { label: "Barclays Premier League", selected: false },
  ]);
  const [regionOptions, setRegionOptions] = useState<FilterOption[]>([
    { label: "England", selected: false },
    { label: "Argentina", selected: false },
    { label: "Spain", selected: false },
    { label: "Africa", selected: false },
    { label: "Europe", selected: false },
  ]);
  const previousSearchQuery = useRef(initialSearchQuery);
  const previousCompetitionOptions = useRef(competitionOptions);
  const previousRegionOptions = useRef(regionOptions);

  const filterOptionArrayToStringArray = (
    filterOptions: FilterOption[] | string[]
  ) => {
    return filterOptions.map((filterOption) => {
      if (typeof filterOption === "string") return filterOption;
      if (filterOption.selected) return filterOption.label;
      return null;
    });
  };

  const fetchFixtures = async (
    limit: number,
    offset: number,
    searchQuery: string,
    previousSearchQuery: string,
    competitions: FilterOption[] | string[] = [],
    previousCompetitions: FilterOption[],
    regions: FilterOption[] | string[] = [],
    previousRegions: FilterOption[] | string[]
  ) => {
    // Turn the competitions array into an array of strings
    competitions = filterOptionArrayToStringArray(competitions);
    regions = filterOptionArrayToStringArray(regions);
    previousCompetitions = filterOptionArrayToStringArray(previousCompetitions);
    previousRegions = filterOptionArrayToStringArray(previousRegions);

    // If the searchQuery, competitions or regions have changed, reset the offset and limit
    if (
      searchQuery !== previousSearchQuery ||
      competitions !== previousCompetitions ||
      regions !== previousRegions
    ) {
      setOffset(0);
      setLimit(10);
    }

    const res = await api.get("/fixtures", {
      params: {
        offset,
        limit,
        searchQuery,
        competitions: competitions,
        country_names: regions,
      },
    });
    const fixtures: Fixture[] = res.data;
    const totalFixtures = fixtures.length;
    const fixtureSets = getFixtureSets(fixtures);
    return {
      fixtureSets,
      totalFixtures,
    };
  };

  const { isLoading, isError, data, error } = useQuery(
    [
      "fixtures",
      limit,
      offset,
      searchQuery,
      previousSearchQuery,
      competitionOptions,
      regionOptions,
    ],
    () =>
      fetchFixtures(
        limit,
        offset,
        searchQuery,
        previousSearchQuery.current,
        competitionOptions,
        previousCompetitionOptions.current,
        regionOptions,
        previousRegionOptions.current
      )
  );

  return {
    offset,
    setOffset,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    isLoading,
    isError,
    data,
    error,
    competitionOptions,
    setCompetitionOptions,
    regionOptions,
    setRegionOptions,
  };
};

export default useFixtureApi;
