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
    setCompetitionOptions,
    regionOptions,
    setRegionOptions,
  } = useFixturesApi();

  return (
    <Layout>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 ">
          <div className="flex min-w-full gap-x-2">
            <div className="w-2/3">
              <Searchbar />
            </div>
            <div className="w-1/3">
              <Filter
                filters={[
                  {
                    type: "checkbox",
                    label: "Competitions",
                    values: competitionOptions,
                    setter: setCompetitionOptions,
                  },
                  {
                    type: "checkbox",
                    label: "Regions",
                    values: regionOptions,
                    setter: setRegionOptions,
                  },
                ]}
              />
            </div>
          </div>

          <div className="my-4">
            {data && <FixturesTable fixtureSets={data.fixtureSets} />}
            {isError && (
              <div className="text-red-500">
                An error has occurred: {error.message}
              </div>
            )}
            {isLoading && <div className="text-blue-500">Loading...</div>}
          </div>
          <Pagination />
        </div>
      </main>
    </Layout>
  );
}
