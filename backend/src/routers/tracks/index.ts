import {
  getTrackAudio,
  getTrackDownload,
  getTrackInfo,
  getTrackQueue,
  getTrackVideo,
} from "./controllers";

import { Router } from "express";

const route = Router();

route.get("/:trackId/", getTrackInfo);
route.get("/:trackId/media", getTrackAudio);
route.get("/:trackId/download", getTrackDownload);
route.get("/:trackId/video", getTrackVideo);
route.get("/:trackId/queue", getTrackQueue);

export { route as tracksRouter };
