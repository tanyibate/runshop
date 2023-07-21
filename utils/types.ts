export type Fixture = {
  fixture_id: string;
  start_time: string;
  country_name: string;
  competition: string;
  home: string;
  away: string;
};

const examplefixture: Fixture = {
  fixture_id: "13749268",
  start_time: "2023-07-13 15:00:00+00",
  country_name: "Argentina",
  competition: "Prim B Metro Reserves",
  home: "Argentino Quilmes II",
  away: "Fenix II",
};

export type Odd = {
  bookmaker_id: string;
  odds_type: string;
  fixture_id: string;
};

const exampleOdd = {
  bookmaker_id: "17",
  odds_type: "1",
  fixture_id: "13662565",
  timestamp: "1689250580923",
  market_parameters: "line=2.5",
  price_names: ["over", "under"],
  prices: [2.35, 1.53],
};
