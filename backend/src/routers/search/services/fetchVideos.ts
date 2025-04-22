import { AppError, Video } from "@/types";

import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchVideos = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query, "videos");

    const tracks: Video[] = ytResults.map((track: any): Video => {
      return {
        id: track.videoId,
        title: track.title,
        thumbnails: track.thumbnails,
        duration: track.duration,
        artists: track.artists,
        saved: false,
        isAvailable: track.isAvailable,
        isExplicit: track.isExplicit,
      };
    });

    return tracks;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
