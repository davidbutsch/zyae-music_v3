import { AlbumCard, AppError, Artist, ArtistCard, Track } from "@/types";

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
    const albums: AlbumCard[] = ytArtist.albums.results.map(
      (album: any): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
        year: album.year,
        isExplicit: album.isExplicit,
      })
    );
    const singles: AlbumCard[] = ytArtist.singles.results.map(
      (album: any): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
        year: album.year,
        isExplicit: album.isExplicit,
      })
    );
    const similar: ArtistCard[] = ytArtist.related.results.map(
      (artist: any): ArtistCard => ({
        id: artist.browseId,
        name: artist.title,
        thumbnail: setGoogleContentSize(artist.thumbnails[0].url, 512, 512),
      })
    );
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
        id: ytArtist.albums.browseId,
        results: albums,
      },
      singles: {
        id: ytArtist.singles.browseId,
        results: singles,
      },
      similar: {
        id: null,
        results: similar,
      },
    };
    return artist;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
