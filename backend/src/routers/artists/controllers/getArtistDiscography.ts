import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import Joi from "joi";
import { fetchArtistDiscography } from "../services";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const getArtistDiscography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        artistId: Joi.string().required().length(24),
      }).required()
    );

    const artistId = req.params.artistId;

    const discography = await fetchArtistDiscography(artistId);

    res.json({ data: { discography } });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
