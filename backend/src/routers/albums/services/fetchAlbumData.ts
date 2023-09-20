import { Album, AlbumCard, Track } from "@/types";
import { newInternalError, setGoogleContentSize } from "@/utils";

import { AppError } from "@/types";
import { getColors } from "@/shared";
import { ytMusic } from "@/loaders";

export const fetchAlbumData = async (process: string, albumId: string) => {
  try {
    process += ".FetchAlbumData";

    const ytAlbum = await ytMusic.getAlbum(albumId);

    const palette = await getColors(process, ytAlbum.thumbnails[0].url);

    const tracks: Track[] = ytAlbum.tracks.map((track: any): Track => {
      return {
        id: track.videoId,
        title: track.title,
        thumbnail: {
          small: null,
          large: null,
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

    const otherVersions: AlbumCard[] = ytAlbum.other_versions?.map(
      (album: any): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
        year: album.year,
        isExplicit: album.isExplicit,
      })
    );
    const album: Album = {
      id: albumId,
      playlistId: ytAlbum.audioPlaylistId,
      description: ytAlbum.description,
      title: ytAlbum.title,
      palette,
      artists: ytAlbum.artists,
      year: ytAlbum.year,
      trackCount: ytAlbum.trackCount,
      duration: ytAlbum.duration,
      type: ytAlbum.type,
      thumbnails: {
        small: setGoogleContentSize(ytAlbum.thumbnails[0].url, 256, 256),
        large: setGoogleContentSize(ytAlbum.thumbnails[0].url, 512, 512),
      },
      tracks,
      otherVersions,
    };

    return album;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
