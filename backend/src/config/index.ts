import dotenv from "dotenv";

process.title = "zyae-music_v3";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
Error.stackTraceLimit = process.env.NODE_ENV === "production" ? -1 : 10;

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (
  !process.env.PORT ||
  !process.env.MONGODB_URI ||
  !process.env.GOOGLEAPIS_KEY
) {
  throw new Error(".env file missing data");
}

export default {
  port: parseInt(process.env.PORT, 10),
  mongodbUrl: process.env.MONGODB_URI,
  googleApisKey: process.env.GOOGLEAPIS_KEY,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  corsWhitelist: [
    "https://zyae.net",
    "https://zyae.net:3000",
    "https://zyae.net:3001",
  ],
};
