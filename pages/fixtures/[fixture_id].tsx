import Header from "@/components/header/Header";
import Layout from "@/components/layout";
import React from "react";
import { Odd } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import prisma from "@/utils/prisma";
import { signIn } from "next-auth/react";
import useOddsApi from "@/hooks/useOddsApi";
import OddsCard from "@/components/oddsCard/OddsCard";
import Searchbar from "@/components/searchbar/Searchbar";
import Filter from "@/components/filter/Filter";

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
    searchQuery,
    setSearchQuery,
    timestampFilterType,
  } = useOddsApi(fixture_id);
  if (session) {
    return (
      <Layout>
        <Header pageName={pageName} />
        <main className="w-full pt-4 flex flex-col">
          <h1 className="text-xl sm:text-3xl font-bold">Odds</h1>
          <div className="text-sm sm:text-base mb-1">
            Click and hold or hover the odds the view the times they were
            published!
          </div>

          <div className="flex flex-col sm:flex-row min-w-full sm:gap-x-2 gap-y-2 sm:gap-y-0 mb-2 sticky top-12">
            <div className="w-full sm:w-2/3">
              <Searchbar
                placeholder="Search bookmaker..."
                changeHandler={(e) =>
                  setSearchQuery(e.target.value.toLowerCase())
                }
              />
            </div>
            <div className="w-full sm:w-1/3">
              <Filter filters={[timestampFilterType]} />
            </div>
          </div>

          <div className="py-2 w-full space-y-4 flex-1 overflow-scroll">
            {oddsAreLoading && <div>Loading...</div>}
            {oddsApiHasError && <div>{oddsApiError}</div>}
            {bookmakersWithOdds &&
              bookmakersWithOdds.map((bookmakerWithOdds) => (
                <OddsCard
                  key={bookmakerWithOdds.name}
                  home={home}
                  away={away}
                  bookMakerOdds={bookmakerWithOdds}
                />
              ))}
            {bookmakersWithOdds && bookmakersWithOdds.length === 0 && (
              <div>
                No odds found for this game. Please try to amend your filters.
              </div>
            )}
          </div>
        </main>
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
