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

export default function Fixture({
  home,
  away,
  fixture_id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  const pageName = `${home} vs ${away}`;
  const { oddsApiError, oddsAreLoading, oddsApiHasError, bookmakersWithOdds } =
    useOddsApi(fixture_id);
  if (session) {
    return (
      <Layout>
        <Header pageName={pageName} />
        <main className="w-full pt-4">
          <h1 className="text-3xl font-bold">Odds</h1>
          <div className="mx-auto max-w-7xl py-6 w-full space-y-4">
            {oddsAreLoading && <div>Loading...</div>}
            {oddsApiHasError && <div>{oddsApiError}</div>}
            {bookmakersWithOdds &&
              bookmakersWithOdds.map((bookmakerWithOdds) => (
                <OddsCard
                  key={bookmakerWithOdds.bookmaker}
                  home={home}
                  away={away}
                  bookMakerOdds={bookmakerWithOdds}
                />
              ))}
            {bookmakersWithOdds && bookmakersWithOdds.length === 0 && (
              <div>
                No odds found for this game. Try filtering for a Europa
                Conference League Game ;)
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
