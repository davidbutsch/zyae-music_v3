import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchTracks } from "../services";
import { newInternalError } from "@/utils";

export const getTracksResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.params.query;

    const results = await fetchTracks(query);

    res.json({
      data: {
        results,
      },
    });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
