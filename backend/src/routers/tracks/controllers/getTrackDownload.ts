import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";
import Joi from "joi";
import { getAudioFile } from "../services";

export const getTrackDownload = async (
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
    const path = await getAudioFile(trackId);

    res.download(path);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
