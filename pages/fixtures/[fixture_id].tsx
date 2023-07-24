import Header from "@/components/header/Header";
import Layout from "@/components/layout";
import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import prisma from "@/utils/prisma";
import { signIn } from "next-auth/react";
import useOddsApi from "@/hooks/useOddsApi";
import OddsCard from "@/components/oddsCard/OddsCard";
import Searchbar from "@/components/searchbar/Searchbar";
import Filter from "@/components/filter/Filter";
import GraphModal from "@/components/modal/GraphModal";

export default function Fixture({
  home,
  away,
  fixture_id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const pageName = `${home} vs ${away}`;
  const {
    oddsApiError,
    oddsAreLoading,
    oddsApiHasError,
    bookmakersWithOdds,
    setSearchQuery,
    timestampFilterType,
  } = useOddsApi(fixture_id);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [bookmaker_id, setBookmakerId] = React.useState<number>(null);
  if (session) {
    return (
      <Layout>
        <Header pageName={pageName} />
        <main className="w-full relative">
          <div className="w-full bg-white h-44 sm:h-36 flex-col flex justify-center">
            <h1 className="text-xl sm:text-3xl font-bold">Odds</h1>
            <div className="text-sm sm:text-base mb-1">
              Hover or press the odds to view the times they were published!
            </div>
            <div className="flex flex-col sm:flex-row min-w-full sm:gap-x-2 gap-y-2 sm:gap-y-0">
              <div className="w-full sm:w-2/3">
                <Searchbar
                  placeholder="Search bookmaker..."
                  changeHandler={(e) =>
                    setSearchQuery(e.target.value.toLowerCase())
                  }
                />
              </div>
              <div className="w-full sm:w-1/3">
                <Filter
                  filters={[timestampFilterType]}
                  title="Filter by category"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 w-full space-y-4 max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-288px)] overflow-y-scroll">
            {oddsAreLoading && <div>Loading...</div>}
            {oddsApiHasError && <div>{oddsApiError}</div>}
            {bookmakersWithOdds &&
              bookmakersWithOdds.map((bookmakerWithOdds) => (
                <OddsCard
                  key={bookmakerWithOdds.name}
                  home={home}
                  away={away}
                  bookMakerOdds={bookmakerWithOdds}
                  triggerModal={(bookmaker_id) => {
                    setBookmakerId(bookmaker_id);
                    setModalOpen(true);
                  }}
                />
              ))}
            {bookmakersWithOdds && bookmakersWithOdds.length === 0 && (
              <div>
                No odds found for this game. Please try to amend your filters.
              </div>
            )}
          </div>
        </main>
        {modalOpen && (
          <GraphModal
            active={modalOpen}
            deactivate={() => setModalOpen(false)}
            bookmaker_id={bookmaker_id}
            fixture_id={fixture_id}
          />
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <Header pageName={pageName} />
      <main className="w-full h-full">
        <div className="mx-auto max-w-7xl py-6 w-full flex-col flex justify-center items-center h-full">
          <div className="text-3xl">Forbidden</div>
          <div className="text-xl">
            You will not be able to view the odds until you sign in
          </div>
          <a className="underline text-2xl" href="#" onClick={() => signIn()}>
            Sign In
          </a>
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  home: string;
  away: string;
  fixture_id: number;
}> = async (context) => {
  const fixture = await prisma.fixture.findUnique({
    where: {
      fixture_id: Number(context.params.fixture_id),
    },
  });
  const home = fixture.home;
  const away = fixture.away;

  return {
    props: {
      home,
      away,
      fixture_id: Number(context.params.fixture_id),
    },
  };
};
