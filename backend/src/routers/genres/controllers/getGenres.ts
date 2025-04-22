import { AppError, AppResponse, ExploreFeed } from "@/types";
import { NextFunction, Request, Response } from "express";

import { fetchGenres } from "../services";
import { newInternalError } from "@/utils";

export const getGenres = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genres = await fetchGenres();

    const response: AppResponse<ExploreFeed["genres"]> = { data: { genres } };
    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
