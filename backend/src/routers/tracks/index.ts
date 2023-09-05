import { Router } from "express";
import { getTrackAudio } from "./controllers";

const route = Router();

route.get("/:trackId", getTrackAudio);

export { route as tracksRouter };
