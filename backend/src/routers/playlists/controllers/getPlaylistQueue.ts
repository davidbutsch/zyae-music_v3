import { AppError, AppResponse, NotFoundError, Playlist, Track } from "@/types";
import { NextFunction, Request, Response } from "express";
import { getColors, parsePlaylist, validate } from "@/shared";
import { getThumbnail, newInternalError } from "@/utils";

import Joi from "joi";
import { JoiPlaylistId } from "@/schemas";
import { PlaylistModel } from "@/models";
import { ytMusic } from "@/loaders";

export const getPlaylistQueue = async (
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
    console.log(playlistId);

    if (playlistId.length == 24) {
      console.log("local");
      playlist = await PlaylistModel.findById(playlistId).lean();
    } else {
      console.log("yt");
      const ytPlaylist = await ytMusic.getPlaylist(playlistId);
      playlist = await parsePlaylist(ytPlaylist);
    }

    if (!playlist) throw new NotFoundError("Playlist not found");

    const tracks = await Promise.all(
      playlist.tracks.map(async (track) => {
        const palette = await getColors(track.thumbnails[0].url);
        return {
          ...track,
          thumbnails: [
            getThumbnail(track.thumbnails[0], 60),
            getThumbnail(track.thumbnails[0], 544),
          ],
          palette,
        };
      })
    );

    const response: AppResponse<Track[]> = {
      data: { queue: tracks },
    };

    res.json(response);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
