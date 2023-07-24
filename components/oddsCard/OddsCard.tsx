import React, { useState } from "react";
import { Odd } from "@prisma/client";
import dateToLocaleString from "@/utils/dateToLocaleString";
import { BookmakerWithOdds } from "@/hooks/useOddsApi";

const OddDisplay = ({ children, timestamp }) => {
  const [hover, setHover] = useState(false);
  const formattedDate = dateToLocaleString(timestamp, true);
  return (
    <button
      className="rounded bg-blue-700 text-white  text-sm sm:text-xl text-center h-12 px-4 sm:h-16 font-semibold flex items-center justify-center w-full sm:flex-1 shadow hover:bg-blue-800 cursor-pointer relative z-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setHover(true)}
      onMouseUp={() => setHover(false)}
      type="button"
    >
      {children}
      {
        /** Tooltip showing the time of the odd */
        hover && (
          <div className="absolute top-0 left-0 bg-gray-900 text-white text-xs sm:text-sm p-1 rounded">
            As of {formattedDate}
          </div>
        )
      }
    </button>
  );
};

export default function OddsCard(props: {
  home: string;
  away: string;
  bookMakerOdds: BookmakerWithOdds;
  triggerModal: (bookmaker_id: number) => void;
}) {
  const { home, away, triggerModal } = props;
  const { name, odds, bookmaker_id } = props.bookMakerOdds;
  const type3Odd = odds.find((odd) => odd.odds_type === 3);
  const arrayOfType1Odds = odds.filter((odd) => odd.odds_type === 1);
  return (
    <div className="w-full rounded-lg border p-6 bg-gray-50 shadow z-20">
      <div className="text-2xl sm:text-4xl font-semibold">{name}</div>
      <a
        href="#"
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        onClick={() => triggerModal(bookmaker_id)}
      >
        View Historical Odds?
      </a>
      {type3Odd && (
        <div className="w-full  pb-2">
          <div className="text-xl sm:text-2xl mt-2 sm:mt-4">Full Time</div>
          <div className="flex  flex-col sm:gap-x-4 sm:flex-row gap-y-2 sm:gap-y-0">
            <OddDisplay timestamp={type3Odd.timestamp}>
              {home}&nbsp;&nbsp;<strong>{type3Odd.prices[0]}</strong>
            </OddDisplay>
            <OddDisplay timestamp={type3Odd.timestamp}>
              Draw<strong>&nbsp;&nbsp;{type3Odd.prices[1]}</strong>
            </OddDisplay>
            <OddDisplay timestamp={type3Odd.timestamp}>
              <span>{away}</span>
              &nbsp;&nbsp;<strong>{type3Odd.prices[2]}</strong>
            </OddDisplay>
          </div>
        </div>
      )}
      {arrayOfType1Odds.length > 0 && (
        <div className="w-full">
          <div className="text-2xl mt-2 sm:mt-4">Total Goals</div>
          <div className="space-y-2">
            {arrayOfType1Odds.map((odd, index) => (
              <div
                className="flex items-center gap-x-4"
                key={home + away + "OverUnder" + index}
              >
                <OddDisplay timestamp={odd.timestamp}>
                  {"Over " + odd.market_parameters}&nbsp;&nbsp;
                  <strong>{odd.prices[0]}</strong>
                </OddDisplay>
                <OddDisplay timestamp={odd.timestamp}>
                  {"Under " + odd.market_parameters}
                  &nbsp;&nbsp;<strong>{odd.prices[1]}</strong>
                </OddDisplay>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
