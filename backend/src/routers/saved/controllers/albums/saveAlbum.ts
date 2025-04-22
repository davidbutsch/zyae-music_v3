import { AppError, AppResponse, GenericCard, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";
import { getThumbnail, newInternalError } from "@/utils";
import { parseAlbum, validate } from "@/shared";

import Joi from "joi";
import { JoiAlbumId } from "@/schemas";
import { UserModel } from "@/models";
import { ytMusic } from "@/loaders";

export const saveAlbum = async (
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

    const user = await UserModel.findById(res.locals.session?.userId);

    if (!user) throw new NotFoundError("User not found");

    const albumId = req.params.albumId;

    const ytAlbum = await ytMusic.getAlbum(albumId);
    const album = await parseAlbum(albumId, ytAlbum);

    user.saved.push({
      id: albumId,
      thumbnails: [getThumbnail(album.thumbnails[0], 256)],
      type: "album",
      title: album.title,
      sub: `${album.type} ${
        album.artists[0].name ? `• ${album.artists[0].name}` : ""
      }`,
    });
    await user.save();

    const response: AppResponse<GenericCard[]> = {
      data: { saved: user.saved },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
