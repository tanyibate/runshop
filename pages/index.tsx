import { useMediaQuery } from "react-responsive";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import safeJsonStringify from "safe-json-stringify";
import useFixturesApi from "@/hooks/useFixturesApi";
import Header from "@/components/header/Header";
import Layout from "@/components/layout";
import Searchbar from "@/components/searchbar/Searchbar";
import Pagination from "@/components/pagination/Pagination";
import FixturesTable from "@/components/fixturesTable/FixturesTable";
import Filter from "@/components/filter/Filter";
import FixturesClass from "@/models/Fixtures";
import { FixtureSetsWithCount } from "@/utils/types";
import getFixtureSets from "@/utils/getFixtureSets";
import { useEffect } from "react";

export default function Fixtures({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    if (window.innerHeight < 1024) setLimit(5);
  }, []);

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
  } = useFixturesApi(undefined, undefined, initialData);

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
            {data && data.fixtureSets.length > 0 && (
              <FixturesTable fixtureSets={data.fixtureSets} />
            )}
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

export const getServerSideProps: GetServerSideProps<{
  initialData: FixtureSetsWithCount;
}> = async () => {
  let initialData: FixtureSetsWithCount = {
    fixtureSets: [],
    totalFixtures: 0,
  };

  try {
    const fixtures = new FixturesClass(10, 0);
    const allFixtures = await fixtures.getFixtures();
    const fixtureCount = await fixtures.getFixturesCount();
    initialData = {
      fixtureSets: getFixtureSets(allFixtures),
      totalFixtures: fixtureCount,
    };
  } catch (err) {
    console.log(err);
  }

  initialData = JSON.parse(safeJsonStringify(initialData));
  return {
    props: {
      initialData,
    },
  };
};
