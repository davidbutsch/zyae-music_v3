import { AppError, TopArtist, Track } from "@/types";

import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchCharts = async () => {
  try {
    const ytCharts = await ytMusic.getCharts();

    const trending100 = "PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI";

    const ytTopVideos = await ytMusic.getPlaylist(trending100);

    const tracks: Track[] = ytTopVideos.tracks
      .slice(0, 5)
      .map((track: any): Track => {
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

    const artists: TopArtist[] = ytCharts.artists.items.map(
      (artist: any): TopArtist => ({
        id: artist.browseId,
        name: artist.title,
        thumbnails: artist.thumbnails,
        rank: Number(artist.rank),
        trend: artist.trend,
      })
    );

    return {
      tracks: { id: trending100, results: tracks },
      artists: { id: null, results: artists },
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
