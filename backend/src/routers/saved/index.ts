import {
  getSaved,
  getSavedQueryResults,
  saveAlbum,
  saveArtist,
  savePlaylist,
  unsaveItem,
} from "./controllers";

import { Router } from "express";
import { attachSession } from "@/shared";

const route = Router();

route.get("/", attachSession(), getSaved);
route.get("/:query", attachSession(), getSavedQueryResults);

route.delete("/:itemId", attachSession(), unsaveItem);

route.post("/playlists/:playlistId", attachSession(), savePlaylist);
route.post("/albums/:albumId", attachSession(), saveAlbum);
route.post("/artists/:artistId", attachSession(), saveArtist);

export { route as savedRouter };
