import {
  AppError,
  AppResponse,
  InternalServerError,
  NotFoundError,
  Playlist,
  Track,
} from "@/types";
import { JoiTrack, JoiZyaePlaylist } from "@/schemas";
import { NextFunction, Request, Response } from "express";

import Joi from "joi";
import { PlaylistModel } from "@/models";
import { newInternalError } from "@/utils";
import { validate } from "@/shared";

export const addToPlaylist = async (
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
      }).required()
    );

    validate(
      req.body,
      "body",
      Joi.object({
        track: Joi.alternatives(Joi.string().length(11), JoiTrack),
      }).required()
    );

    const playlistId = req.params.playlistId;
    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) throw new NotFoundError("Playlist not found");

    const track: string | Track = req.body.track;

    if (typeof track == "string")
      throw new InternalServerError("Not implemented");
    else {
      playlist.tracks.unshift(track);
      playlist.trackCount = playlist.tracks.length;
      await playlist.save();

      const response: AppResponse<Playlist> = {
        data: { playlist },
      };

      res.json(response);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
