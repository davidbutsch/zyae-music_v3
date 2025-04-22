import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import Joi from "joi";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";
import { ytMusic } from "@/loaders";

export const getTrackInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        trackId: Joi.string().length(11).required(),
      }).required()
    );

    const trackId = req.params.trackId;

    const ytTrack = (await ytMusic.getWatchlist(trackId)).tracks[0];

    res.json({
      data: {
        track: ytTrack,
      },
    });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
// https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&playlistId=RDKDGWPOcpvs4&key=AIzaSyBXbPIjBnYqw0chxa4SCxYorELlOEXIVNw&maxResults=50
