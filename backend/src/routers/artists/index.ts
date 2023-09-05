import { Router } from "express";
import { attachSession } from "@/shared/middleware";
import { getArtist } from "./controllers";

const route = Router();

route.get(
  "/:artistId",
  attachSession({ checkExists: false, checkExpired: false }),
  getArtist
);

export { route as artistsRouter };
