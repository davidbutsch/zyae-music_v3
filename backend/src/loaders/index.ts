import { Express } from "express";
import { Logger } from "./logger";
import { Server } from "http";
import { expressLoader } from "./express";
import { mongooseLoader } from "./mongoose";
import { redisLoader } from "./redis";
import { scheduleLoader } from "./schedule";
import { socketLoader } from "./socketio";
import { ytMusicLoader } from "./ytmusicapi";

export * from "./logger";
export * from "./ytmusicapi";
export * from "./redis";
export * from "./socketio";

export const loaders = async ({
  app,
  httpServer,
}: {
  app: Express;
  httpServer: Server;
}) => {
  try {
    ytMusicLoader();
    const io = socketLoader({ httpServer });
    redisLoader({ io });
    mongooseLoader();
    scheduleLoader();
    expressLoader({ app });
  } catch (err) {
    Logger.error(`Error while calling loaders: ${err}`);
  }
};
