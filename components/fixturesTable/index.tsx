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
  console.log(fixtureSets);

  return (
    <div className="relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {fixtureSets.map((fixtureSet) => {
            return (
              <React.Fragment key={fixtureSet.millis}>
                <tr className="text-xs text-gray-700 uppercase bg-gray-100 h-8">
                  <td colSpan={2} className="pl-5">
                    {fixtureSet.date}
                  </td>
                </tr>
                {fixtureSet.fixtures.map((fixture) => {
                  return (
                    <tr
                      key={fixture.fixture_id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                      onClick={() =>
                        router.push(`/fixtures/${fixture.fixture_id}`)
                      }
                    >
                      <td className="px-6 py-4">{fixture.competition}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {fixture.home} vs {fixture.away}
                      </th>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
