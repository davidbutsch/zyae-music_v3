import { getArtist, getArtistDiscography } from "./controllers";

import { Router } from "express";
import { attachSession } from "@/shared/middleware";

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
