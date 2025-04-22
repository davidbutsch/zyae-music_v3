import { getGenre, getGenres } from "./controllers";

import { Router } from "express";
import { attachSession } from "@/shared/middleware";

const route = Router();

route.get(
  "/",
  attachSession({ checkExists: false, checkExpired: false }),
  getGenres
);

route.get(
  "/:params",
  attachSession({ checkExists: false, checkExpired: false }),
  getGenre
);

export { route as genresRouter };
