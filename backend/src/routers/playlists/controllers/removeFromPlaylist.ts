import { AppError, AppResponse, NotFoundError, Playlist } from "@/types";
import { JoiTrackId, JoiZyaePlaylist } from "@/schemas";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { PlaylistModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const removeFromPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validate(
      req.params,
      "params",
      Joi.object({
        playlistId: JoiZyaePlaylist,
        trackId: JoiTrackId,
      }).required()
    );

    const playlistId = req.params.playlistId;
    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) throw new NotFoundError("Playlist not found");

    const trackId = req.params.trackId;

    playlist.tracks = playlist.tracks.filter((track) => track.id !== trackId);
    playlist.trackCount = playlist.tracks.length;
    await playlist.save();

    const response: AppResponse<Playlist> = {
      data: { playlist },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
