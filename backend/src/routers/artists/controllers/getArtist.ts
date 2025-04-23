import { parseArtist, validate } from "@/shared";
import { AppError, AppResponse, Artist } from "@/types";
import { NextFunction, Request, Response } from "express";

import { ytMusic } from "@/loaders";
import { newInternalError } from "@/utils";
import Joi from "joi";

export const getArtist = async (
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

    console.log(artistId);

    const ytArtist = await ytMusic.getArtist(artistId);

    const artist = await parseArtist(ytArtist, artistId);

    const response: AppResponse<Artist> = {
      data: { artist },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
