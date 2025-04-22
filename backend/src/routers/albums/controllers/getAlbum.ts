import { Album, AppError, AppResponse } from "@/types";
import { NextFunction, Request, Response } from "express";
import { parseAlbum, validate } from "@/shared";

import Joi from "joi";
import { JoiAlbumId } from "@/schemas";
import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const getAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        albumId: JoiAlbumId,
      }).required()
    );

    const albumId = req.params.albumId;
    const ytAlbum = await ytMusic.getAlbum(albumId);
    const album = await parseAlbum(req.params.albumId, ytAlbum);

    const response: AppResponse<Album> = {
      data: { album },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
