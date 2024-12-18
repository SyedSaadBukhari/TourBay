import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../dbConfig/dbConfig";
import Destination, { IDestination } from "../../models/destinations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | IDestination[]
    | { message: string }
    | { message: string; destination: IDestination }
  >
) {
  try {
    await connect();

    if (req.method === "GET") {
      const { id, location, date, price, booked } = req.query;

      if (id) {
        const destination = await Destination.findById(id);
        if (!destination) {
          return res.status(404).json({ message: "Destination not found" });
        }
        return res.status(200).json(destination);
      }
      const query: {
        location?: RegExp;
        date?: { $gte: Date };
        price?: { $gte: number; $lte?: number };
        booked?: boolean;
      } = {};

      if (location) query.location = new RegExp(location as string, "i");
      if (date) query.date = { $gte: new Date(date as string) };
      if (price) {
        const [min, max] = (price as string).split("-");
        query.price = { $gte: +min, ...(max !== "above" && { $lte: +max }) };
      }
      if (booked) query.booked = booked === "true";

      const destinations = await Destination.find(query);
      return res.status(200).json(destinations);
    }

    if (req.method === "POST") {
      console.log(
        "Received POST request with body:",
        JSON.stringify(req.body, null, 2)
      );

      const newDestination = new Destination(req.body);

      console.log(
        "Created new Destination object:",
        JSON.stringify(newDestination, null, 2)
      );

      const savedDestination = await newDestination.save();

      console.log(
        "Saved Destination:",
        JSON.stringify(savedDestination, null, 2)
      );

      return res.status(201).json({
        message: "Destination created successfully!",
        destination: savedDestination,
      });
    }

    if (req.method === "PATCH") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Destination ID is required" });
      }

      const destination = await Destination.findByIdAndUpdate(
        id,
        { booked: true },
        { new: true }
      );

      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }

      return res.status(200).json(destination);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error handling request:", error);
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Failed to handle request: ${error.message}` });
    }
    return res.status(500).json({ message: "An unknown error occurred" });
  }
}
