import express, { Express, NextFunction, Request, Response } from "express";

import { ForbiddenError } from "@/types";
import { Logger } from "./logger";
import config from "@/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { apiRouter } from "@/routers";

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
  app.use((req, res, next) => {
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
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../", "/client/dist/index.html"));
  });
};
