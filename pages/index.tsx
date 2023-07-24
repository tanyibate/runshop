import useFixturesApi from "@/hooks/useFixturesApi";
import Header from "@/components/header/Header";
import Layout from "@/components/layout";
import Searchbar from "@/components/searchbar/Searchbar";
import Pagination from "@/components/pagination/Pagination";
import FixturesTable from "@/components/fixturesTable/FixturesTable";
import Filter from "@/components/filter/Filter";
import { useMediaQuery } from "react-responsive";

export default function Fixtures() {
  const isShortScreen = useMediaQuery({
    query: "(max-height: 1024px)",
  });
  const {
    data,
    error,
    isLoading,
    isError,
    competitionOptions,
    handleCompetitionOptionsChange,
    regionOptions,
    handleRegionOptionsChange,
    handleSearchQueryChange,
    limit,
    offset,
    setOffset,
    setLimit,
  } = useFixturesApi(undefined, isShortScreen ? 5 : 10);

  return (
    <Layout>
      <Header pageName={"Fixtures"} />
      <main className="w-full h-full">
        <div className="mx-auto max-w-7xl pt-4 w-full h-full bg-white z-50">
          <div className="flex flex-col sm:flex-row min-w-full sm:gap-x-2 gap-y-2 sm:gap-y-0 mb-4">
            <div className="w-full sm:w-2/3">
              <Searchbar
                placeholder="Search by Fixture..."
                changeHandler={(e) =>
                  handleSearchQueryChange(e.target.value.toLowerCase())
                }
              />
            </div>
            <div className="w-full sm:w-1/3">
              <Filter
                filters={[
                  {
                    type: "checkbox",
                    label: "Competitions",
                    values: competitionOptions,
                    setter: handleCompetitionOptionsChange,
                  },
                  {
                    type: "checkbox",
                    label: "Regions",
                    values: regionOptions,
                    setter: handleRegionOptionsChange,
                  },
                ]}
                title="Filter by category"
              />
            </div>
          </div>

          <div
            className="w-full max-w-full overflow-hidden relative overflow-y-scroll sm:overflow-y-auto"
            style={{
              height: "calc(100vh - 380px)",
            }}
          >
            {data && <FixturesTable fixtureSets={data.fixtureSets} />}
            {data && data.fixtureSets.length === 0 && (
              <div className="text-blue-500">No fixtures found</div>
            )}
            {isError && (
              <div className="text-red-500">
                An error has occurred:{" "}
                {error instanceof Error
                  ? error.message
                  : "Please try again later"}
              </div>
            )}
            {isLoading && <div className="text-blue-500">Loading...</div>}
          </div>
          {data && (
            <Pagination
              limit={limit}
              total={data.totalFixtures}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </div>
      </main>
    </Layout>
  );
}
