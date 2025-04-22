import { AppError, AppResponse, ExploreFeed } from "@/types";
import { NextFunction, Request, Response } from "express";
import { fetchCharts, fetchUserGenres } from "../services";

import { newInternalError } from "@/utils";

export const getFeed = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const charts = await fetchCharts();
    const genres = await fetchUserGenres();
    // const newReleases = await fetchNewReleases();

    const response: AppResponse<ExploreFeed> = {
      data: { feed: { charts, genres } },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
