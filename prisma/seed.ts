import { PrismaClient } from "@prisma/client";
import fixtures from "../fixtures.json";
import bookmakers from "../bookmakers.json";
import odds from "../odds.json";
const prisma = new PrismaClient();
async function main() {
  for (const fixture of fixtures) {
    await prisma.fixture.create({
      data: {
        fixture_id: parseInt(fixture.fixture_id),
        start_time: new Date(fixture.start_time),
        country_name: fixture.country_name,
        competition: fixture.competition,
        home: fixture.home,
        away: fixture.away,
      },
    });
  }

  for (const bookmaker of bookmakers) {
    await prisma.bookmaker.create({
      data: {
        bookmaker_id: parseInt(bookmaker.bookmaker_id),
        name: bookmaker.name,
      },
    });
  }

  const returnMarketParameters = (market_parameters: string) => {
    if (market_parameters.includes("2.5")) return 2.5;
    if (market_parameters.includes("1.5")) return 1.5;
    if (market_parameters.includes("0.5")) return 0.5;
    return undefined;
  };

  for (const odd of odds) {
    await prisma.odd.create({
      data: {
        fixture_id: parseInt(odd.fixture_id),
        bookmaker_id: parseInt(odd.bookmaker_id),
        timestamp: new Date(parseInt(odd.timestamp)),
        market_parameters: returnMarketParameters(odd.market_parameters),
        odds_type: parseInt(odd.odds_type),
        price_names: JSON.parse(odd.price_names),
        prices: JSON.parse(odd.prices).map((price: string) =>
          parseFloat(price)
        ),
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
