import { Thumbnail } from "@/types";
import Joi from "joi";
import { JoiReqNum, JoiReqString } from "./required";

export const JoiThumbnail = Joi.object<Thumbnail>({
  url: JoiReqString,
  width: JoiReqNum,
  height: JoiReqNum,
});

export const JoiThumbnails = Joi.array().items(JoiThumbnail);
