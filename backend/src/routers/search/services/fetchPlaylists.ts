import { AppError, PlaylistCard } from "@/types";

import { newInternalError } from "@/utils";
import { ytMusic } from "@/loaders";

export const fetchPlaylists = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query, "community_playlists");

    const playlists: PlaylistCard = ytResults.map(
      (ytResult: any): PlaylistCard => ({
        id: ytResult.browseId,
        title: ytResult.title,
        thumbnails: ytResult.thumbnails,
        author: ytResult.author,
        sub: `Playlist by ${ytResult.author}`,
      })
    );

    return playlists;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
