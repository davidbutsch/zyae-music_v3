import { AppError, Playlist, Track } from "@/types";

import { getColors } from "@/shared";
import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchPlaylistData = async (playlistId: string) => {
  try {
    const ytPlaylist = await ytMusic.getPlaylist(playlistId);

    const palette = await getColors(ytPlaylist.thumbnails[0].url);

    const tracks: Track[] = ytPlaylist.tracks.map((track: any): Track => {
      const trackData: Track = {
        id: track.videoId,
        title: track.title,
        thumbnails: track.thumbnails,
        duration: track.duration,
        artists: track.artists,
        isAvailable: track.isAvailable,
        isExplicit: track.isExplicit,
      };

      if (track.album)
        trackData.album = {
          id: track.album.id,
          title: track.album.name,
        };

      return trackData;
    });

    const playlist: Playlist = {
      id: playlistId,
      description: ytPlaylist.description,
      title: ytPlaylist.title,
      palette,
      author: ytPlaylist.author,
      year: ytPlaylist.year,
      trackCount: ytPlaylist.trackCount,
      duration: ytPlaylist.duration,
      thumbnails: ytPlaylist.thumbnails,
      tracks,
      permissions: {
        default: ["view"],
      },
    };

    return playlist;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
