import "module-alias/register";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { Logger, loaders } from "@/loaders";

import config from "@/config";
import express from "express";
import http from "http";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  loaders({ app, httpServer });

  httpServer
    .listen(config.port, () => {
      Logger.info(
        `zyae-music_v3 started in ${process.env.NODE_ENV} mode on port: ${config.port}`
      );
    })
    .on("error", (err) => {
      Logger.error(err);
      // process.exit(1);
    });
}
startServer();
