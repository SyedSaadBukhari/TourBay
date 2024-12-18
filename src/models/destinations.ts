import mongoose from "mongoose";

export interface IDestination {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  rating?: number;
  price?: number;
  createdAt?: Date;
  duration?: string;
  date?: Date;
  booked?: boolean;
  details?: {
    destination: string;
    departureLocation: string;
    returnTime: string;
    included: string[];
  };
  itinerary?: {
    day: number;
    temperature: string;
    activities: string[];
  }[];
}

const itinerarySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    temperature: { type: String, required: true },
    activities: { type: [String], required: true },
  },
  { _id: false }
);

const detailsSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    departureLocation: { type: String, required: true },
    returnTime: { type: String, required: true },
    included: { type: [String], required: true },
  },
  { _id: false }
);

const destinationSchema = new mongoose.Schema<IDestination>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    price: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now },
    duration: { type: String, required: true },
    date: { type: Date },
    booked: { type: Boolean, default: false },
    details: { type: detailsSchema },
    itinerary: { type: [itinerarySchema] },
  },
  {
    strict: false,
    strictQuery: false,
  }
);

const Destination =
  mongoose.models.destinations ||
  mongoose.model("destinations", destinationSchema);

export default Destination;
