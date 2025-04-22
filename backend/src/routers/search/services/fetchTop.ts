import { AppError, GenericCard } from "@/types";
import { getThumbnail, newInternalError } from "@/utils";

import { ytMusic } from "@/loaders";

export const fetchTop = async (query: string) => {
  try {
    const ytResults = await ytMusic.search(query);

    const mapResultCategories = (type: string | null) => {
      switch (type) {
        case null:
        case "More from YouTube":
        case "Top result":
          return "Top results";
        case "Songs":
          return "Tracks";
        case "Community playlists":
          return "Playlists";
        case "Featured playlists":
        case "Podcasts":
        case "Episodes":
        case "Profiles":
          return "NotImplemented";
        default:
          return type;
      }
    };

    const results: { type: string; items: GenericCard[] }[] = [];

    const getResultItem = (ytResult: any): GenericCard | null => {
      let owner = ytResult.artists?.[0]?.name;

      if (
        owner === "Single" ||
        owner === "Album" ||
        owner === "Song" ||
        owner === "EP" ||
        owner === "Video"
      )
        owner = ytResult.artists?.[1]?.name;

      if (ytResult.resultType == "artist") {
        return {
          id: ytResult.browseId || ytResult.artists[0].id,
          type: "artist",
          title: ytResult.artist || owner,
          sub: "Artist",
          thumbnails: ytResult.thumbnails,
        };
      } else if (ytResult.resultType == "album") {
        if (!ytResult.browseId) return null;
        else
          return {
            id: ytResult.browseId,
            type: "album",
            title: ytResult.title,
            sub: `${ytResult.type} by ${owner} • ${ytResult.year}`,
            thumbnails: ytResult.thumbnails,
          };
      } else if (ytResult.resultType == "playlist") {
        if (!ytResult.browseId) return null;
        return {
          id: ytResult.browseId,
          type: "playlist",
          title: ytResult.title,
          sub: `Playlist by ${ytResult.author}`,
          thumbnails: [getThumbnail(ytResult.thumbnails[0], 64)],
        };
      } else if (ytResult.resultType == "song") {
        const sub = `Track by ${owner}`;

        return {
          id: ytResult.videoId,
          type: "track",
          title: ytResult.title,
          sub,
          thumbnails: [getThumbnail(ytResult.thumbnails[0], 544)],
          isExplicit: ytResult.isExplicit,
        };
      } else if (ytResult.resultType == "video") {
        const sub = `Video by ${owner}`;

        return {
          id: ytResult.videoId,
          type: "track",
          title: ytResult.title,
          sub,
          thumbnails: ytResult.thumbnails,
          isExplicit: ytResult.isExplicit,
        };
      } else {
        return null;
      }
    };

    ytResults.forEach((ytResult: any) => {
      const category = mapResultCategories(ytResult.category);
      if (category == "NotImplemented") return;

      const item = getResultItem(ytResult);
      if (!item) return;

      const result = results.find((result) => result.type == category);

      if (!result) results.push({ type: category, items: [item] });
      else result.items.push(item);
    });

    return results;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};
