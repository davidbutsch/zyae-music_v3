import { AppError, AppErrorResponse, NotFoundError } from "@/types";
import { NextFunction, Request, Response, Router } from "express";

import { Logger } from "@/loaders";
import { albumsRouter } from "./albums";
import { artistsRouter } from "./artists";
import { tracksRouter } from "./tracks";

const route = Router();

route.use("/tracks", tracksRouter);
route.use("/artists/", artistsRouter);
route.use("/albums/", albumsRouter);

route.all("*", (req, res, next) => next(new NotFoundError("Route not found")));

route.use((err: any, req: Request, res: Response, next: NextFunction) => {
  next(err);
  Logger.error(err);
});

// handle AppError
route.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    const responseError: AppErrorResponse = {
      code: err.code,
      message: err.message,
      status: err.name,
    };

    if (err.details.length > 0) {
      const details = err.details.map((detail) => {
        if (detail.reason == "Error") detail.reason = "InternalError";
        detail.metadata = {
          route: res.locals.route,
          process: detail.metadata.process,
          flags: detail.metadata.flags,
        };

        return detail;
      });
      responseError.details = details;
    }
    // only include errors container if service is in development mode
    if (process.env.NODE_ENV == "development" && err.errors.length > 0)
      responseError.errors = err.errors.map((err) => ({
        name: err.name,
        message: err.message,
        stack: err.stack,
        raw: err,
      }));

    res.status(responseError.code).json({ error: responseError });
  } else next(err);
});

// handle SyntaxError
route.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    const responseError: AppErrorResponse = {
      code: 400,
      message: err.message,
      status: err.name,
    };

    if (process.env.NODE_ENV == "development") responseError.errors = [err];

    res.status(responseError.code).json({ error: responseError });
  } else next(err);
});

// handle unknown errors
route.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const responseError: AppErrorResponse = {
    code: err.statusCode || err.code || err.status,
    message: err.message || "Unexpected error occured",
    status: err.name || "InternalError",
  };

  if (typeof responseError.code !== "number") responseError.code = 500;
  if (process.env.NODE_ENV == "development") responseError.errors = [err];

  res.status(responseError.code).json({ error: responseError });
});

export { route as apiRouter };
