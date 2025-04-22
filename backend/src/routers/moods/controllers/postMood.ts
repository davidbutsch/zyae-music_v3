import { AppError, MoodTemplate } from "@/types";
import { JoiAlbumId, JoiGenreId, JoiPlaylistId, JoiReqString } from "@/schemas";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { createMood } from "../services/createMood";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const postMood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.body,
      "body",
      Joi.object<MoodTemplate>({
        title: JoiReqString,
        genre: JoiGenreId,
        rows: Joi.array()
          .items(
            Joi.object({
              variant: JoiReqString.valid("tracks", "playlists", "albums"),
              playlistId: JoiPlaylistId,
              cardIds: Joi.array().items(
                Joi.alternatives().try(JoiPlaylistId, JoiAlbumId)
              ),
            })
          )
          .required(),
      })
    );

    const mood = await createMood(req.body);

    res.json(mood);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
