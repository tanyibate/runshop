import { Odd, Fixture } from ".prisma/client";

export type OverUnderChartData = {
  timestamp: string;
  over: number;
  under: number;
};

export type WinLossDrawChartData = {
  timestamp: string;
  win: number;
  loss: number;
  draw: number;
};

export type ChartData = {
  overUnder0Point5Data: OverUnderChartData[];
  overUnder1Point5Data: OverUnderChartData[];
  overUnder2Point5Data: OverUnderChartData[];
  winLossDrawData: WinLossDrawChartData[];
};

export type BookmakerWithOdds = {
  name: string;
  odds: Odd[];
  bookmaker_id: number;
};

export type FixtureSet = {
  date: string;
  fixtures: Fixture[];
  millis: number;
};

export type FixtureSetsWithCount = {
  fixtureSets: FixtureSet[];
  totalFixtures: number;
};
