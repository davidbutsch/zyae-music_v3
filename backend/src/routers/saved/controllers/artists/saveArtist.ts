import { AppError, AppResponse, GenericCard, NotFoundError } from "@/types";
import { NextFunction, Request, Response } from "express";
import { getThumbnail, newInternalError } from "@/utils";
import { parseArtist, validate } from "@/shared";

import Joi from "joi";
import { JoiArtistId } from "@/schemas/joi/artists";
import { UserModel } from "@/models";
import { ytMusic } from "@/loaders";

export const saveArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        artistId: JoiArtistId,
      }).required()
    );

    const user = await UserModel.findById(res.locals.session?.userId);

    if (!user) throw new NotFoundError("User not found");

    const artistId = req.params.artistId;

    const ytArtist = await ytMusic.getArtist(artistId);
    const artist = await parseArtist(ytArtist, artistId);

    user.saved.push({
      id: artist.id,
      thumbnails: [getThumbnail(artist.thumbnails[0], 256)],
      type: "artist",
      title: artist.name,
      sub: `Artist`,
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
