import { AppError, Track } from "@/types";
import { getThumbnail, newInternalError } from "@/utils";

import { ytMusic } from "@/loaders";

export const fetchTracks = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query, "songs");

    const tracks: Track[] = ytResults.map((track: any): Track => {
      return {
        id: track.videoId,
        title: track.title,
        thumbnails: [
          getThumbnail(track.thumbnails[0], 60),
          getThumbnail(track.thumbnails[0], 544),
        ],
        duration: track.duration,
        artists: track.artists,
        album: {
          id: track.album.id,
          title: track.album.name,
        },
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
