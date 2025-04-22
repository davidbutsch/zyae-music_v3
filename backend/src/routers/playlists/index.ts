import {
  addToPlaylist,
  createNewPlaylist,
  deletePlaylist,
  getPlaylist,
  getPlaylistQueue,
  removeFromPlaylist,
  updatePlaylist,
} from "./controllers";

import { Router } from "express";
import { attachSession } from "@/shared";

const route = Router();

route.get(
  "/:playlistId",
  attachSession({ checkExists: false, checkExpired: false }),
  getPlaylist
);
route.get("/:playlistId/queue", getPlaylistQueue);
route.post("/", attachSession(), createNewPlaylist);
route.patch("/:playlistId/", attachSession(), updatePlaylist);
route.delete("/:playlistId/", attachSession(), deletePlaylist);

// TODO attach session and check permissions
route.post("/:playlistId/tracks", addToPlaylist);
route.delete("/:playlistId/tracks/:trackId", removeFromPlaylist);

export { route as playlistsRouter };
