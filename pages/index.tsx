import useFixturesApi from "@/hooks/useFixturesApi";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Searchbar from "@/components/searchbar";
import Pagination from "@/components/pagination";
import FixturesTable from "@/components/fixturesTable";
import Filter from "@/components/filter";

export default function Fixtures() {
  const {
    data,
    error,
    isLoading,
    isError,
    competitionOptions,
    handleCompetitionOptionsChange,
    regionOptions,
    handleRegionOptionsChange,
    limit,
    offset,
  } = useFixturesApi();

  return (
    <Layout>
      <Header />
      <main className="w-full">
        <div className="mx-auto max-w-7xl py-6 w-full">
          <div className="flex flex-col sm:flex-row min-w-full sm:gap-x-2 gap-y-2 sm:gap-y-0">
            <div className="w-full sm:w-2/3">
              <Searchbar />
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
              />
            </div>
          </div>

          <div className="mt-4">
            {data && <FixturesTable fixtureSets={data.fixtureSets} />}
            {isError && (
              <div className="text-red-500">
                An error has occurred: {error.message}
              </div>
            )}
            {isLoading && <div className="text-blue-500">Loading...</div>}
          </div>
          {data && (
            <Pagination
              limit={limit}
              total={data.totalFixtures}
              offset={offset}
            />
          )}
        </div>
      </main>
    </Layout>
  );
}
