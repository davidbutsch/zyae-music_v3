import {
  AppError,
  AppResponse,
  GenericCard,
  NotFoundError,
  Playlist,
} from "@/types";
import { NextFunction, Request, Response } from "express";
import { PlaylistModel, UserModel } from "@/models";
import { getThumbnail, newInternalError } from "@/utils";
import { parsePlaylist, validate } from "@/shared";

import Joi from "joi";
import { JoiPlaylistId } from "@/schemas";
import { ytMusic } from "@/loaders";

export const savePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        playlistId: JoiPlaylistId,
      }).required()
    );

    const playlistId = req.params.playlistId;
    var playlist: Playlist | null;

    const user = await UserModel.findById(res.locals.session?.userId);

    if (!user) throw new NotFoundError("User not found");

    if (playlistId.length == 24) {
      playlist = await PlaylistModel.findById(playlistId).lean();
    } else {
      const ytPlaylist = await ytMusic.getPlaylist(playlistId);
      playlist = await parsePlaylist(ytPlaylist);
    }

    if (!playlist) throw new NotFoundError("Playlist not found");

    user.saved.push({
      id: playlist.id,
      thumbnails: [getThumbnail(playlist.thumbnails[0], 256)],
      type: "playlist",
      title: playlist.title,
      sub: `Playlist • ${playlist.author.name}`,
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
