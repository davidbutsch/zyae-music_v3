import express, { Express, Request, Response } from "express";

import config from "@/config";
import { apiRouter } from "@/routers";
import { ForbiddenError } from "@/types";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { Logger } from "./logger";

export const expressLoader = ({ app }: { app: Express }) => {
  app.disable("x-powered-by");
  app.enable("trust proxy");
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || config.corsWhitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new ForbiddenError("Cross-Origin request blocked"), false);
        }
      },
      credentials: true,
    })
  );

  // http logger
  app.use((req, _res, next) => {
    Logger.info({
      message: `${req.method} ${req.url}`,
      url: req.url,
      headers: req.headers,
    });
    next();
  });

  app.use("/api", apiRouter);

  // serve static assets
  app.use(express.static(path.join(__dirname, "../../../", "/client/dist/")));

  // serve app
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../", "/client/dist/index.html"));
  });
};
