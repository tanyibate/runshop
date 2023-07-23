import React from "react";
import { Odd } from "@prisma/client";

const OddDisplay = ({ children }) => (
  <div className="rounded bg-blue-600 text-white  text-sm sm:text-xl text-center h-12 px-4 sm:h-16 font-semibold flex items-center justify-center w-full sm:flex-1">
    {children}
  </div>
);

export default function OddsCard(props: {
  home: string;
  away: string;
  bookMakerOdds: {
    name: string;
    odds: Odd[];
  };
}) {
  const { home, away } = props;
  const { name, odds } = props.bookMakerOdds;
  const type3Odd = odds.find((odd) => odd.odds_type === 3);
  const arrayOfType1Odds = odds.filter((odd) => odd.odds_type === 1);
  return (
    <div className="w-full rounded-lg border p-6 bg-gray-800 ">
      <div className="text-4xl">{name}</div>
      <a
        href="#"
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        View Historical Odds?
      </a>
      {type3Odd && (
        <div className="w-full  pb-2">
          <div className="text-3xl mt-4">Full Time</div>
          <div className="flex  flex-col sm:gap-x-4 sm:flex-row gap-y-2 sm:gap-y-0">
            <OddDisplay>{home + " " + type3Odd.prices[0]}</OddDisplay>
            <OddDisplay>{"Draw " + type3Odd.prices[1]}</OddDisplay>
            <OddDisplay>{away + " " + type3Odd.prices[2]}</OddDisplay>
          </div>
        </div>
      )}
      {arrayOfType1Odds.length > 0 && (
        <div className="w-full">
          <div className="text-3xl mt-4 ">Total Goals</div>
          <div className="space-y-2">
            {arrayOfType1Odds.map((odd) => (
              <div className="flex items-center gap-x-4">
                <OddDisplay>
                  {"Over " + odd.market_parameters + " " + odd.prices[0]}
                </OddDisplay>
                <OddDisplay>
                  {"Under " + odd.market_parameters + " " + odd.prices[1]}
                </OddDisplay>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
