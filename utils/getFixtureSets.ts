import { Fixture } from ".prisma/client";
import { FixtureSet } from "@/components/fixturesTable/FixturesTable";
import dateToLocaleString from "./dateToLocaleString";

// Function to turn an array of fixtures into an array of FixtureSets
const getFixtureSets = (fixtures: Fixture[]): FixtureSet[] => {
  const fixtureSets: FixtureSet[] = [];

  fixtures.forEach((fixture) => {
    const formattedDate = dateToLocaleString(
      fixture.start_time as unknown as string
    );
    // Check if the fixtureSet already exists
    const fixtureSetIndex = fixtureSets.findIndex(
      (fixtureSet) => fixtureSet.date === formattedDate
    );

    if (fixtureSetIndex === -1) {
      // If it doesn't exist, create it and add the fixture
      fixtureSets.push({
        date: formattedDate,
        fixtures: [fixture],
        millis: new Date(formattedDate).getTime(),
      });
    } else {
      // If it does exist, add the fixture to the existing fixtureSet
      fixtureSets[fixtureSetIndex].fixtures.push(fixture);
    }
  });

  return fixtureSets;
};

export default getFixtureSets;
