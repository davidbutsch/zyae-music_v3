import { AlbumCard, AppError } from "@/types";
import { newInternalError, setGoogleContentSize } from "@/utils";

import { ytMusic } from "@/loaders";

export const fetchArtistDiscography = async (
  process: string,
  artistId: string
) => {
  try {
    process += ".FetchArtistDiscography";

    const ytArtist = await ytMusic.getArtist(artistId);
    const discographyId = ytArtist.albums.browseId || ytArtist.singles.browseId;

    if (!discographyId)
      return {
        items: [...ytArtist.singles, ytArtist.albums],
      };

    const ytArtistAlbums = await ytMusic.getArtistAlbums(discographyId);

    const albums: AlbumCard[] = ytArtistAlbums.map(
      (album): AlbumCard => ({
        id: album.browseId,
        title: album.title,
        thumbnail: setGoogleContentSize(album.thumbnails[0].url, 512, 512),
        year: album.year,
        type: album.type,
      })
    );

    return {
      items: albums,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};
