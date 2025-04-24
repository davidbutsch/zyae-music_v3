import { Playlist, Track } from "@/types";

import { getColors } from "@/shared";
import { getThumbnail } from "@/utils";

export const parsePlaylist = async (ytPlaylist: any): Promise<Playlist> => {
  const palette = await getColors(ytPlaylist.thumbnails[0]?.url);

  const tracks: Track[] = ytPlaylist.tracks.map((track: any): Track => {
    const trackData: Track = {
      id: track.videoId,
      title: track.title,
      thumbnails: [
        getThumbnail(track.thumbnails[0], 60),
        getThumbnail(track.thumbnails[0], 544),
      ],
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
    id: ytPlaylist.id,
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
};
