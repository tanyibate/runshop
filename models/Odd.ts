import { BookmakerWithOdds } from "@/utils/types";
import prisma from "@/utils/prisma";

export default class Odd {
  private fixture_id: number;
  private bookmaker_id: number | undefined;
  private timestamp: string | undefined;
  private sortOrder: "asc" | "desc" = "desc";
  private searchQuery: string = "";

  constructor(
    fixture_id: number,
    bookmaker_id: number | undefined = undefined,
    timestamp: string = new Date().toISOString(),
    sortOrder: "asc" | "desc" = "desc",
    searchQuery: string = ""
  ) {
    this.fixture_id = fixture_id;
    this.bookmaker_id = bookmaker_id;
    this.timestamp = timestamp;
    this.sortOrder = sortOrder;
    this.searchQuery = searchQuery;
  }

  public async getAllOddsByTimestamp(): Promise<BookmakerWithOdds[]> {
    let date = new Date();
    if (this.timestamp) date = new Date(this.timestamp);
    const dateString = `'${date.toISOString()}'`;

    // Validate date, fixture_id and sortOrder to prevent SQL injection
    if (isNaN(date.getTime())) throw new Error("Invalid date string");
    if (isNaN(this.fixture_id)) throw new Error("Invalid fixture_id");
    if (this.sortOrder !== "asc" && this.sortOrder !== "desc")
      throw new Error("Invalid sortOrder");

    return await prisma.$queryRawUnsafe(`
    SELECT oddstable.name,json_agg(to_jsonb(oddstable.*) - 'bookmaker_id') as odds, oddstable.bookmaker_id 
    FROM (SELECT DISTINCT ON (od.bookmaker_id, od.market_parameters ) bm.name, od.*
            FROM "Odd" od
            LEFT JOIN "Bookmaker" bm ON od.bookmaker_id=bm.bookmaker_id
            WHERE 
                od.fixture_id = ${this.fixture_id} 
                AND od.prices != '{}' 
                AND od.timestamp <= ${dateString}
                AND LOWER(bm.name) LIKE LOWER('%${this.searchQuery}%')
            ORDER BY  od.bookmaker_id ASC, od.market_parameters ASC, od.timestamp ${this.sortOrder}
        ) oddstable
    GROUP BY oddstable.name, oddstable.bookmaker_id
`);
  }

  public async getAllOddsByBookmaker() {
    return await prisma.odd.findMany({
      where: {
        fixture_id: this.fixture_id,
        bookmaker_id: this.bookmaker_id,
        prices: {
          isEmpty: false,
        },
      },
      orderBy: {
        timestamp: this.sortOrder,
      },
    });
  }
}
