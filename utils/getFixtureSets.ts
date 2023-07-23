import { Fixture } from ".prisma/client";
import { FixtureSet } from "@/components/fixturesTable/FixturesTable";

// Function to turn an array of fixtures into an array of FixtureSets
const getFixtureSets = (fixtures: Fixture[]): FixtureSet[] => {
  const fixtureSets: FixtureSet[] = [];

  fixtures.forEach((fixture) => {
    const fixtureDate = new Date(fixture.start_time);

    const formattedDate = fixtureDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
