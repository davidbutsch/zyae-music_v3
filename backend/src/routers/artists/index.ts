import { getArtist, getArtistDiscography } from "./controllers";

import { attachSession } from "@/shared/middleware";
import { Router } from "express";

const route = Router();

route.get(
  "/:artistId",
  attachSession({ checkExists: false, checkExpired: false }),
  getArtist
);

route.get(
  "/:artistId/discography",
  attachSession({ checkExists: false, checkExpired: false }),
  getArtistDiscography
);

export { route as artistsRouter };
