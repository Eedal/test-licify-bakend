import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://mongo/testlicifydb";

export const PORT = process.env.PORT || 3000;

export const HOST = process.env.HOST || "0.0.0.0";
