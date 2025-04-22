import { AlbumCard, AppError } from "@/types";

import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchAlbums = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query, "albums");

    const albums: AlbumCard = ytResults.map(
      (ytResult: any): AlbumCard => ({
        id: ytResult.browseId,
        title: ytResult.title,
        thumbnails: ytResult.thumbnails,
        year: ytResult.year,
        sub: `${ytResult.artists[1].name} • ${ytResult.year}`,
        type: ytResult.type,
        isExplicit: ytResult.isExplicit,
      })
    );

    return albums;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
