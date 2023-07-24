import prisma from "@/utils/prisma";

export default class Fixtures {
  private limit: number;
  private offset: number;
  private searchQuery: string;
  private totalFixtures: number;

  private competitions: string[];
  private country_names: string[];

  constructor(
    limit: number,
    offset: number,
    searchQuery: string = "",
    competitions: string[] = [],
    country_names: string[] = []
  ) {
    this.limit = limit;
    this.offset = offset;
    this.searchQuery = searchQuery;
    this.competitions = competitions;
    this.country_names = country_names;
  }

  private generateGetFixturesByCategoryQueryObject() {
    return {
      AND: [
        {
          OR: [
            {
              home: {
                contains: this.searchQuery,
                mode: "insensitive",
              },
            },
            {
              away: {
                contains: this.searchQuery,
                mode: "insensitive",
              },
            },
          ],
        },
        {
          OR: [
            ...this.competitions.map((competition) => ({
              competition: competition,
            })),
            ...this.country_names.map((country_name) => ({
              country_name: country_name,
            })),
          ],
        },
      ],
    };
  }

  private generateGetFixturesBySearchQueryQueryObject() {
    return {
      OR: [
        {
          home: {
            contains: this.searchQuery,
            mode: "insensitive",
          },
        },
        {
          away: {
            contains: this.searchQuery,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  private async getAllFixtures() {
    return await prisma.fixture.findMany({
      take: this.limit,
      skip: this.offset,
    });
  }

  private async getFixturesBySearchQuery() {
    return await prisma.fixture.findMany({
      where: this.generateGetFixturesBySearchQueryQueryObject(),
      take: this.limit,
      skip: this.offset,
    });
  }

  private async getFixturesByCategory() {
    return await prisma.fixture.findMany({
      where: this.generateGetFixturesByCategoryQueryObject(),
      take: this.limit,
      skip: this.offset,
    });
  }

  private async getFixturesCountByCategory() {
    return await prisma.fixture.count({
      where: this.generateGetFixturesByCategoryQueryObject(),
    });
  }

  private async getFixturesCountBySearchQuery() {
    return await prisma.fixture.count({
      where: this.generateGetFixturesBySearchQueryQueryObject(),
    });
  }

  public async getFixtures() {
    if (this.competitions.length > 0 || this.country_names.length > 0)
      return await this.getFixturesByCategory();
    if (this.searchQuery) return await this.getFixturesBySearchQuery();
    return await this.getAllFixtures();
  }

  public async getFixturesCount() {
    if (this.competitions.length > 0 || this.country_names.length > 0)
      return await this.getFixturesCountByCategory();
    if (this.searchQuery) return await this.getFixturesCountBySearchQuery();
    return await prisma.fixture.count();
  }
}
