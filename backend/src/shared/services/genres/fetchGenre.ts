import { AlbumCard, AppError, PlaylistCard, Track } from "@/types";
import { getThumbnail, newInternalError } from "@/utils";

import { ytMusic } from "@/loaders";

const mapRowTitle = (type: string | null) => {
  switch (type) {
    case "Songs":
      return "tracks";
    case "Community playlists":
      return "playlists";
    case "Albums":
      return "albums";
    case "Music videos":
    case "Featured playlists":
      return "NotImplemented";
    default:
      return type;
  }
};

export const fetchGenre = async (params: string) => {
  try {
    const ytGenre = await ytMusic.getMoodContent(params);

    const rows: { [key: string]: any[] } = {
      tracks: [],
      albums: [],
      playlists: [],
    };

    ytGenre.rows.forEach((row: any) => {
      const key = mapRowTitle(row.title);
      if (!key || key == "NotImplemented") return;
      rows[key] = row.contents;
    });

    const tracks: Track[] = rows.tracks.map((track: any): Track => {
      return {
        id: track.videoId,
        title: track.title,
        thumbnails: [
          getThumbnail(track.thumbnails[0], 60),
          getThumbnail(track.thumbnails[0], 544),
        ],
        duration: track.duration,
        artists: track.artists.slice(0, -1),
        album: track.album
          ? {
              id: track.album.id,
              title: track.album.name,
            }
          : undefined,
        isAvailable: track.isAvailable,
        isExplicit: track.isExplicit,
      };
    });

    const albums: AlbumCard[] = rows.albums.map(
      (album: any): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnails: album.thumbnails,
        sub: album.year,
        isExplicit: album.isExplicit,
      })
    );

    const playlists: PlaylistCard[] = rows.playlists.map(
      (playlist: any): PlaylistCard => ({
        id: playlist.playlistId,
        title: playlist.title,
        thumbnails: playlist.thumbnails,
        author: "",
        sub: `${playlist.description.split("•")[1]}`,
      })
    );

    const response = {
      params,
      title: ytGenre.title,
      tracks: tracks,
      albums: albums,
      playlists: playlists,
    };

    return response;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
