import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import Joi from "joi";
import { getAudioFile } from "../services";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const getTrackAudio = async (
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

    res.sendFile(path);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
