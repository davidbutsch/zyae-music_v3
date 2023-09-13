import { AppError, Artist, Track } from "@/types";

import { AlbumCard } from "@/types/albums";
import { getColors } from "@/shared/";
import { newInternalError } from "@/utils";
import { setGoogleContentSize } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchArtistData = async (process: string, artistId: string) => {
  try {
    process += ".FetchArtistData";
    const ytArtist = await ytMusic.getArtist(artistId);
    const palette = await getColors(process, ytArtist.thumbnails[0].url);
    const tracks: Track[] = ytArtist.songs.results.map((track: any): Track => {
      console.log(track.album);
      return {
        id: track.videoId,
        title: track.title,
        thumbnail: {
          small: setGoogleContentSize(track.thumbnails[0].url, 120, 120),
          large: setGoogleContentSize(track.thumbnails[0].url, 512, 512),
        },
        duration: track.duration,
        artists: track.artists,
        album: {
          id: track.album.id,
          title: track.album.name,
        },
        saved: false,
        isAvailable: track.isAvailable,
        isExplicit: track.isExplicit,
      };
    });
    const albums: AlbumCard[] = ytArtist.albums.results.map((album: any) => ({
      id: album.browseId,
      title: album.title,
      thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
      year: album.year,
      isExplicit: album.isExplicit,
    }));
    const singles: AlbumCard[] = ytArtist.singles.results.map((album: any) => ({
      id: album.browseId,
      title: album.title,
      thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
      year: album.year,
      isExplicit: album.isExplicit,
    }));
    // const similar: ArtistCard[] = ytArtist
    const artist: Artist = {
      id: ytArtist.channelId,
      description: ytArtist.description,
      views: ytArtist.views,
      name: ytArtist.name,
      saved: false,
      palette: palette,
      thumbnails: {
        banner: {
          mobile: setGoogleContentSize(ytArtist.thumbnails[0].url, 1440, 1440),
          desktop: setGoogleContentSize(ytArtist.thumbnails[0].url, 2880, 1800),
        },
      },
      tracks: {
        id: ytArtist.songs.browseId,
        results: tracks,
      },
      albums: {
        id: null,
        results: albums,
      },
      singles: {
        id: null,
        results: singles,
      },
    };
    return artist;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
