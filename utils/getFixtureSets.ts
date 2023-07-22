import { Fixture } from ".prisma/client";
import { FixtureSet } from "@/components/fixturesTable";

// Function to turn an array of fixtures into an array of FixtureSets
const getFixtureSets = (fixtures: Fixture[]): FixtureSet[] => {
  const fixtureSets: FixtureSet[] = [];

  fixtures.forEach((fixture) => {
    const fixtureDate = new Date(fixture.start_time);
    const yyyy = fixtureDate.getFullYear();
    let mm: number | string = fixtureDate.getMonth() + 1; // Months start at 0!
    let dd: number | string = fixtureDate.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedDate = dd + "/" + mm + "/" + yyyy;

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
