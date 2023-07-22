import { NextApiRequest, NextApiResponse } from "next";
import Fixtures from "../../models/Fixtures";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    res.status(405).json({ message: "Method not allowed" });

  if (req.query["competitions[]"]) {
    req.query.competitions = req.query["competitions[]"];
    if (typeof req.query.competitions === "string") {
      req.query.competitions = [req.query.competitions];
    }
  }

  if (req.query["country_names[]"]) {
    req.query.country_names = req.query["country_names[]"];
    if (typeof req.query.country_names === "string") {
      req.query.country_names = [req.query.country_names];
    }
  }

  try {
    const fixtures = new Fixtures(
      parseInt(req.query.limit as string),
      parseInt(req.query.offset as string),
      req.query.searchQuery ? (req.query.searchQuery as string) : "",
      req.query.competitions ? (req.query.competitions as string[]) : [],
      req.query.country_names ? (req.query.country_names as string[]) : []
    );
    fixtures
      .getFixtures()
      .then((fixtures) => {
        res.status(200).json(fixtures);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
