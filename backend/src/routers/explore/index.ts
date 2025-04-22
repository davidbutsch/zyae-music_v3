import { Router } from "express";
import { attachSession } from "@/shared/middleware";
import { getFeed } from "./controllers";
import { temp } from "./temp";

const route = Router();

route.get(
  "/feed",
  attachSession({ checkExists: false, checkExpired: false }),
  getFeed
);

route.get("/colors/", temp);

export { route as exploreRouter };
