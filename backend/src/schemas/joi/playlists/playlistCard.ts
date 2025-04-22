import { PlaylistCard } from "@/types";
import Joi from "joi";
import { JoiReqString } from "../required";
import { JoiThumbnails } from "../thumbnails";

export const JoiPlaylistCard = Joi.object<PlaylistCard>({
  id: JoiReqString,
  title: JoiReqString,
  thumbnails: JoiThumbnails,
  author: JoiReqString,
  sub: JoiReqString,
});
