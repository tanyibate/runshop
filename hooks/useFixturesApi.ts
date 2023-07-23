import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { Fixture } from ".prisma/client";
import getFixtureSets from "../utils/getFixtureSets";
import api from "../utils/api";
import { FilterOption } from "@/components/filter/Filter";

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
  const previousSearchQuery = useRef("");
  const previousCompetitionOptions = useRef([]);
  const previousRegionOptions = useRef([]);

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery((previous) => {
      previousSearchQuery.current = previous;
      return value;
    });
  };

  const handleCompetitionOptionsChange = (values: FilterOption[]) => {
    setCompetitionOptions((previous) => {
      console.log(previous);
      previousCompetitionOptions.current = previous;
      return values;
    });
  };

  const arraysEqual = (a1: any, a2: any) => {
    return JSON.stringify(a1) == JSON.stringify(a2);
  };

  const handleRegionOptionsChange = (values: FilterOption[]) => {
    setRegionOptions((previous) => {
      previousRegionOptions.current = previous;
      return values;
    });
  };

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

    // compare if the searchQuery, competitions or regions arrays are not equal to the previous ones and reset the offset and limit
    if (
      searchQuery !== previousSearchQuery ||
      !arraysEqual(competitions, previousCompetitions) ||
      !arraysEqual(regions, previousRegions)
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
    const fixtures: Fixture[] = res.data.results;
    const totalFixtures = res.data.count;
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
    handleSearchQueryChange,
    isLoading,
    isError,
    data,
    error,
    competitionOptions,
    handleCompetitionOptionsChange,
    regionOptions,
    handleRegionOptionsChange,
  };
};

export default useFixtureApi;
