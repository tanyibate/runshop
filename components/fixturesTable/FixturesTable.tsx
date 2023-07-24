import React from "react";
import { useRouter } from "next/router";
import { Fixture } from "@prisma/client";

export type FixtureSet = {
  date: string;
  fixtures: Fixture[];
  millis: number;
};

export default function FixturesTable(props: { fixtureSets: FixtureSet[] }) {
  const router = useRouter();
  const { fixtureSets } = props;
  const formatMinutes = (minutes: number) => {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  };
  const dateToHHMM = (date: string | Date) => {
    date = new Date(date);
    return `${date.getHours()}:${formatMinutes(date.getMinutes())}`;
  };

  return (
    <table className="text-sm text-left text-gray-500 max-w-full w-full">
      <thead className="w-full sticky top-0 left-0 bg-white z-30">
        <tr className="min-w-full">
          <th className="px-6 py-4">Kickoff</th>
          <th className="px-6 py-4 hidden sm:table-cell">Region</th>
          <th className="px-6 py-4 hidden sm:table-cell">Competition</th>
          <th className="px-6 py-4">Fixture</th>
        </tr>
      </thead>
      <tbody className="divide-y flex-1 w-full ">
        {fixtureSets.map((fixtureSet) => {
          return (
            <React.Fragment key={fixtureSet.millis}>
              <tr className="text-xs text-gray-700 uppercase bg-gray-100 h-8 max-w-full">
                <td colSpan={4} className="pl-5">
                  {fixtureSet.date}
                </td>
              </tr>
              {fixtureSet.fixtures.map((fixture) => {
                return (
                  <tr
                    key={fixture.fixture_id}
                    className="bg-white cursor-pointer"
                    onClick={() =>
                      router.push(`/fixtures/${fixture.fixture_id}`)
                    }
                  >
                    {
                      <td className="px-4 sm:px-6 py-4">{`${dateToHHMM(
                        fixture.start_time
                      )} `}</td>
                    }

                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 hidden sm:table-cell">
                      {fixture.country_name}
                    </td>
                    <td className="px-4 sm:px-6py-4 hidden sm:table-cell">
                      {fixture.competition}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      {fixture.home} vs {fixture.away}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
