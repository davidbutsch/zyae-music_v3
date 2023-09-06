import { AppError, Artist } from "@/types";

import { newInternalError } from "@/utils";
import { setGoogleContentSize } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchArtistData = async (process: string, artistId: string) => {
  try {
    process += ".FetchArtistData";

    const ytArtist = await ytMusic.getArtist(artistId);

    const tracks = ytArtist.songs.results.map((track) => {
      return {
        id: track.videoId,
        title: track.title,
        thumbnail: setGoogleContentSize(track.thumbnails[0].url, 120, 120),
        artists: track.artists,
        album: track.album,
        saved: false,
        isAvailable: track.isAvailable,
        isExplicit: track.isExplicit,
      };
    });

    const artist: Artist = {
      id: ytArtist.channelId,
      description: ytArtist.description,
      views: ytArtist.views,
      name: ytArtist.name,
      saved: false,
      thumbnails: {
        banner: {
          mobile: setGoogleContentSize(ytArtist.thumbnails[0].url, 1440, 1440),
          desktop: setGoogleContentSize(ytArtist.thumbnails[0].url, 1440, 800),
        },
      },
      tracks: {
        id: ytArtist.songs.browseId,
        results: tracks,
      },
    };

    return artist;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
