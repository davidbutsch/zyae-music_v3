import { AppError, Track } from "@/types";
import { NextFunction, Request, Response } from "express";

import { getColors } from "@/shared";
import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const getTrackQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trackId = req.params.trackId;
    const queue = await ytMusic.getWatchlist(trackId);

    const tracks: Track[] = await Promise.all(
      queue.tracks.map(async (track: any): Promise<Track> => {
        const palette = await getColors(track.thumbnail[0].url);
        return {
          id: track.videoId,
          title: track.title,
          thumbnails: track.thumbnail,
          duration: track.length,
          artists: track.artists,
          album: track.album
            ? {
                id: track.album.id,
                title: track.album.name,
              }
            : undefined,
          palette,
          isAvailable: true,
        };
      })
    );

    res.json({
      data: {
        queue: tracks,
      },
    });
  } catch (err) {
    if (err instanceof AppError) return next(err);
    else return next(newInternalError(err));
  }
};
