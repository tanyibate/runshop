export type Fixture = {
  fixture_id: string;
  start_time: string;
  country_name: string;
  competition: string;
  home: string;
  away: string;
};

export type Odd = {
  bookmaker_id: string;
  odds_type: string;
  fixture_id: string;
};

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
