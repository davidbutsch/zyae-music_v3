import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchTop } from "../services";
import { newInternalError } from "@/utils";

export const getTopResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.params.query;

    const results = await fetchTop(query);

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
