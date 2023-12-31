import { useState } from "react";
import { useQuery } from "react-query";
import { Fixture } from ".prisma/client";
import getFixtureSets from "../utils/getFixtureSets";
import api from "../utils/api";
import { FilterOption } from "@/components/filter/Filter";
import debounce from "lodash.debounce";
import { FixtureSetsWithCount } from "@/utils/types";

const useFixtureApi = (
  initialSearchQuery: string = "",
  initialLimit: number = 10,
  initialData: FixtureSetsWithCount = { fixtureSets: [], totalFixtures: 0 }
) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(initialLimit);
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

  const handleSearchQueryChange = debounce((value: string) => {
    setOffset(0);
    setSearchQuery(value);
  }, 500);

  const handleCompetitionOptionsChange = (values: FilterOption[]) => {
    setOffset(0);
    setCompetitionOptions(values);
  };

  const handleRegionOptionsChange = (values: FilterOption[]) => {
    setOffset(0);
    setRegionOptions(values);
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
    competitions: FilterOption[] | string[] = [],
    regions: FilterOption[] | string[] = []
  ) => {
    // Turn the competitions array into an array of strings
    competitions = filterOptionArrayToStringArray(competitions);
    regions = filterOptionArrayToStringArray(regions);

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

  const { isLoading, isError, data, error } = useQuery<FixtureSetsWithCount>(
    ["fixtures", limit, offset, searchQuery, competitionOptions, regionOptions],
    () =>
      fetchFixtures(
        limit,
        offset,
        searchQuery,
        competitionOptions,
        regionOptions
      ),
    {
      initialData: initialData,
    }
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
