import { Express } from "express";
import { Server } from "http";
import { expressLoader } from "./express";
import { mongooseLoader } from "./mongoose";
import { redisLoader } from "./redis";
import { socketLoader } from "./socketio";
import { ytMusic } from "./ytmusicapi";
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
  const io = socketLoader({ httpServer });
  redisLoader({ io });
  mongooseLoader();
  ytMusicLoader();
  expressLoader({ app });
};
