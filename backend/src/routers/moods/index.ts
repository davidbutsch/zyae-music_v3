import { Router } from "express";
import { attachSession } from "@/shared/middleware";
import { postMood } from "./controllers";

const route = Router();

// route.get(
//   "/",
//   attachSession({ checkExists: false, checkExpired: false }),
//   getGenres
// );

route.post(
  "/",
  attachSession({ checkExists: false, checkExpired: false }),
  postMood
);

export { route as moodsRouter };
