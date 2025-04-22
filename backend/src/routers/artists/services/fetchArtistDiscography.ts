import { AlbumCard, AppError } from "@/types";

import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchArtistDiscography = async (artistId: string) => {
  try {
    const ytArtist = await ytMusic.getArtist(artistId);
    const discographyId =
      ytArtist.albums?.browseId || ytArtist.singles?.browseId;

    const ytArtistAlbums = !discographyId
      ? [
          ...(ytArtist.singles?.results.map((single: any) => ({
            ...single,
            type: "Single",
          })) || []),
          ...(ytArtist.albums?.results.map((album: any) => ({
            ...album,
            type: album.type,
          })) || []),
        ]
      : await ytMusic.getArtistAlbums(artistId, discographyId);

    const albums: AlbumCard[] = ytArtistAlbums.map(
      (album: any): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnails: album.thumbnails,
        year: album.year,
        sub: `${album.year} • ${album.type}`,
        type: album.type,
      })
    );

    return {
      artist: { id: artistId, name: ytArtist.name },
      items: albums,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
