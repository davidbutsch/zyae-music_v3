import { AppError, ArtistCard } from "@/types";
import { getThumbnail, newInternalError } from "@/utils";

import { ytMusic } from "@/loaders";

export const fetchArtists = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query, "artists");

    const artists: ArtistCard = ytResults.map(
      (ytResult: any): ArtistCard => ({
        id: ytResult.browseId,
        name: ytResult.artist,
        thumbnails: [getThumbnail(ytResult.thumbnails[0], 256)],
      })
    );

    return artists;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
