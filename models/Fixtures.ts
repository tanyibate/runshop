import prisma from "@/utils/prisma";

export default class Fixtures {
  private limit: number;
  private offset: number;
  private searchQuery: string;

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
  private async getAllFixtures() {
    return await prisma.fixture.findMany({
      take: this.limit,
      skip: this.offset,
    });
  }

  private async getFixturesBySearchQuery() {
    return await prisma.fixture.findMany({
      where: {
        OR: [
          {
            home: {
              contains: this.searchQuery,
            },
          },
          {
            away: {
              contains: this.searchQuery,
            },
          },
        ],
      },
      take: this.limit,
      skip: this.offset,
    });
  }

  private async getFixturesByCategory() {
    return await prisma.fixture.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                home: {
                  contains: this.searchQuery,
                },
              },
              {
                away: {
                  contains: this.searchQuery,
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
      },
      take: this.limit,
      skip: this.offset,
    });
  }

  public async getFixtures() {
    if (this.competitions.length > 0 || this.country_names.length > 0)
      return await this.getFixturesByCategory();
    if (this.searchQuery) return await this.getFixturesBySearchQuery();
    return await this.getAllFixtures();
  }
}
