import {
  AppError,
  AppResponse,
  NotFoundError,
  Playlist,
  ResponsePlaylist,
} from "@/types";
import { NextFunction, Request, Response } from "express";
import { getUserAccess, parsePlaylist } from "@/shared/";

import Joi from "joi";
import { JoiPlaylistId } from "@/schemas";
import { PlaylistModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";
import { ytMusic } from "@/loaders";

export const getPlaylist = async (
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

    const zyaeUser = res.locals.user;

    const playlistId = req.params.playlistId;
    var playlist: Playlist | null;

    if (playlistId.length == 24) {
      playlist = await PlaylistModel.findById(playlistId).lean();
    } else {
      const ytPlaylist = await ytMusic.getPlaylist(playlistId);
      playlist = await parsePlaylist(ytPlaylist);
    }

    if (!playlist) throw new NotFoundError("Playlist not found");

    const userAccess = getUserAccess(playlist, zyaeUser?._id);

    const responsePlaylist: ResponsePlaylist = {
      ...playlist,
      userAccess,
    };

    if (!userAccess.includes("edit:metadata"))
      delete responsePlaylist.permissions;

    const response: AppResponse<ResponsePlaylist> = {
      data: { playlist: responsePlaylist },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
