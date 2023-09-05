import { NextFunction, Request, Response } from "express";

import { AppError } from "@/types";
import { getAudioStream } from "../services";
import { newInternalError } from "@/utils";
import { stream } from "winston";

export const getTrackAudio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trackId = req.params.trackId;
    const stream = getAudioStream("GetTrackAudio", trackId);

    // res.json(await stream);
    res.setHeader("Content-Type", "audio/mp3");

    (await stream).pipe(res);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError("abc", err));
  }
};
