import { getAlbum, getAlbumQueue } from "./controllers";

import { Router } from "express";

const route = Router();

route.get("/:albumId", getAlbum);
route.get("/:albumId/queue", getAlbumQueue);

export { route as albumsRouter };
