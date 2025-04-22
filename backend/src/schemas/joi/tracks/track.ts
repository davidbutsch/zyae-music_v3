import Joi from "joi";
import { JoiPalette } from "../palette";
import { JoiReqString } from "../required";
import { Track } from "@/types";

export const JoiTrack = Joi.object<Track>({
  id: JoiReqString,
  title: JoiReqString,
  thumbnails: Joi.any(), // TODO implement later
  duration: Joi.string(),
  artists: Joi.array().items({
    name: JoiReqString,
    id: JoiReqString.allow(null),
  }),
  album: Joi.object({
    title: JoiReqString,
    id: JoiReqString,
  }),
  palette: JoiPalette,
  isAvailable: Joi.boolean(),
  isExplicit: Joi.boolean(),
});
