import { NextApiRequest, NextApiResponse } from "next";
import Odd from "@/models/Odd";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    res.status(405).json({ message: "Method not allowed" });

  const { fixture_id, timestamp, sortOrder } = req.query;

  try {
    /*const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }*/
    const odds = new Odd(
      parseInt(fixture_id as string),
      undefined,
      timestamp as string,
      sortOrder as "asc" | "desc"
    );

    const results = await odds.getAllOddsByTimestamp();
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
