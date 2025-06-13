import dotenv from "dotenv";

process.title = "zyae-music_v3";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
Error.stackTraceLimit = process.env.NODE_ENV === "production" ? -1 : 10;

dotenv.config();

if (
  !process.env.PORT ||
  !process.env.MONGODB_URI ||
  !process.env.GOOGLEAPIS_KEY ||
  !process.env.YT_DLP_PATH ||
  !process.env.FFMPEG_PATH ||
  !process.env.MEDIA_PATH
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
  corsWhitelist: ["https://music.zyae.net", "https://localhost:3000"],
  ytDlpPath: process.env.YT_DLP_PATH,
  ffmpegPath: process.env.FFMPEG_PATH,
  mediaPath: process.env.MEDIA_PATH,
};
