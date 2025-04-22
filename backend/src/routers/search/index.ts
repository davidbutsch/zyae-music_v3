import {
  getAlbumsResults,
  getArtistsResults,
  getPlaylistsResults,
  getSearchSuggestions,
  getTopResults,
  getTracksResults,
  getVideosResults,
} from "./controllers";

import { Router } from "express";

const route = Router();

route.get("/:query/suggestions", getSearchSuggestions);
route.get("/:query/results/top", getTopResults);
route.get("/:query/results/tracks", getTracksResults);
route.get("/:query/results/videos", getVideosResults);
route.get("/:query/results/artists", getArtistsResults);
route.get("/:query/results/albums", getAlbumsResults);
route.get("/:query/results/playlists", getPlaylistsResults);

export { route as searchRouter };
