import { AppError, AppResponse, Genre } from "@/types";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { fetchGenre } from "../services";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const getGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        params: Joi.string().required().length(24),
      }).required()
    );

    const params = req.params.params;

    const genre = await fetchGenre(params);

    // BUG
    if (!genre) return;

    const response: AppResponse<Genre> = { data: { genre } };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
