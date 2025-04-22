import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { fetchSuggestions } from "../services";
import { newInternalError } from "@/utils";

export const getSearchSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.params.query;

    const suggestions = await fetchSuggestions(query);

    res.json({
      data: {
        suggestions,
      },
    });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
