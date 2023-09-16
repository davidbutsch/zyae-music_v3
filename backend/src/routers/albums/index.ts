import { Router } from "express";
import { getAlbum } from "./controllers";

const route = Router();

route.get("/:albumId", getAlbum);

export { route as albumsRouter };
